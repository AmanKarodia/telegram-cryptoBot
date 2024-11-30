import { Activities, youtubeicon, usercomments, Earn, Wallet, LuckyWin, rightArrow, share, MEME_COIN } from '../../images';
import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, increment, getDoc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";


const RefPage: React.FC = () => {

  const navigate = useNavigate();
  const db = getFirestore();
  const [user, setUser] = useState<any>(null);
  const [referrerId, setReferrerId] = useState<string | null>(null);

 // Initialize state with the value from localStorage or default to 0
 const [claimedPoints, setClaimedPoints] = useState<number>(() => {
  const savedPoints = localStorage.getItem("claimedPoints");
  return savedPoints ? parseInt(savedPoints, 10) : 0;
});


  // Update localStorage whenever claimedPoints changes
  useEffect(() => {
    localStorage.setItem("claimedPoints", claimedPoints.toString());
  }, [claimedPoints]);

  // Detect referrer ID from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const referrer = queryParams.get("ref");
    if (referrer) {
      setReferrerId(referrer); // Set the referrer ID from the URL
    }
  }, []);


   // Firebase Auth: Anonymous Authentication
   useEffect(() => {
    const auth = getAuth();
  
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // Set authenticated user
        await fetchPoints(firebaseUser.uid); // Fetch points for current user
  
        // If referred by someone, award points to the new user and referrer
        if (referrerId && referrerId !== firebaseUser.uid) {
          await rewardReferrer(referrerId); // Reward referrer with points
          await awardPointsToNewUser(firebaseUser.uid); // Award points to new user
        }
      } else {
        try {
          const userCredential = await signInAnonymously(auth); // Sign in anonymously
          setUser(userCredential.user);
          await fetchPoints(userCredential.user.uid); // Fetch points for the new user
          if (referrerId) {
            await rewardReferrer(referrerId); // Reward referrer if there's one
            await awardPointsToNewUser(userCredential.user.uid); // Award points to the new user
          }
        } catch (error) {
          console.error("Error signing in anonymously:", error);
        }
      }
    });
  
    return () => unsubscribe(); // Cleanup listener
  }, [referrerId]);

  const awardPointsToNewUser = async (newUserUid: string) => {
    try {
      const userDocRef = doc(db, "users", newUserUid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        // If the user document exists, increment points by 10
        await updateDoc(userDocRef, { points: increment(10) });
        console.log(`New user ${newUserUid} rewarded with 10 points.`);
      } else {
        console.log("User document does not exist.");
      }
    } catch (error) {
      console.error("Error awarding points to new user:", error);
    }
  };

   // Fetch points from Firestore
   const fetchPoints = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        setClaimedPoints(data?.points || 0); // Safe access to points
      } else {
        await setDoc(userDocRef, { points: 0 }); // Initialize points if user doesn't exist
        setClaimedPoints(0);
      }
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  // Handle link sharing
  const handleShare = () => {
    if (!user) {
      alert("You must be logged in to share your link.");
      return;
    }

    const referralLink = `${window.location.origin}?ref=${user.uid}`;

    if (navigator.share) {
      navigator.share({
        title: "Referral Link",
        text: "Join via my referral link!",
        url: referralLink,
      });
    } else {
      navigator.clipboard.writeText(referralLink);
      alert("Referral link copied to clipboard!");
    }
  };

  // Real-time listener for points changes
  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setClaimedPoints(data.points || 0);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  // Reward the referrer with points
  const rewardReferrer = async (referrerUid: string) => {
    try {
      const referrerDocRef = doc(db, "users", referrerUid);
      const referrerDocSnap = await getDoc(referrerDocRef);
  
      if (referrerDocSnap.exists()) {
        console.log("Referrer document exists. Incrementing points...");
        await updateDoc(referrerDocRef, {
          points: increment(10),  // Increment points by 10
        });
        console.log(`Referrer ${referrerUid} rewarded with 10 points.`);
      } else {
        console.log("Referrer document does not exist.");
      }
    } catch (error) {
      console.error("Error rewarding referrer:", error);
    }
  };
  
  // Sync points to Firestore and localStorage
useEffect(() => {
  const syncPointsToFirestore = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      console.log("Syncing points to Firestore:", claimedPoints);
      await updateDoc(userDocRef, { points: claimedPoints });
      localStorage.setItem("claimedPoints", claimedPoints.toString());
    }
  };

  if (user && claimedPoints !== 0) {
    syncPointsToFirestore();
  }
}, [claimedPoints, user]);

  return (
    <div className="min-h-screen bg-[#131313] text-white p-4">
        {/* Header */}
        <div className="flex justify-between items-center mt-4">
          <div className="relative flex items-center text-lg ml-5 text-[#bfad94]">
          <div className="dot mr-1"></div>
          <img src={rightArrow} alt="right" className="w-5 h-5 right242" />
            <span className="ml-2">Daily Checkin</span>
          </div>
          <div className="flex items-center bg-[#272a2f] px-3 py-1 rounded-full">
            <img src={MEME_COIN} alt="dollarCoin" className="w-6 h-6 mr-3" />
            <p className="text-yellow-400">{claimedPoints ?? "Loading points..."}</p>
        </div>
      </div>



        {/* Tabs Section */}
        <div className="rounded-lg flex flex-row sm:flex-row justify-between mb-5 mt-16 border-solid border-1 border-[#444444]">
        <button onClick={() => navigate('/Activities')} className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm">
          <img src={Activities} alt="Activities" className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 sm:left-8" />
          <p>Tasks</p>
        </button>
        <button onClick={() => navigate('/VideoPage')} className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm">
          <div className="dot232"></div>
          <img src={youtubeicon} alt="Videos" className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 sm:left-8" />
          <p>Videos</p>
        </button>
        <button className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm">
          <img src={usercomments} alt="Referrals" className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 sm:left-8" />
          <p>Referrals</p>
        </button>
      </div>

        {/* Referral Section */}
        <div className=" p-5 mt-4 rounded-lg">
          <h2 className="text-[30px]">Invite friends, get rewards!</h2>
          <p className="text-[20px] text-gray-400 mt-2">
            The more friends you refer, the more you earn and get rewarded!
          </p>

          {/* Share Invite Link Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
            onClick={handleShare}
            className="flex items-center justify-center w-full py-5 rounded-lg mr-2  text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
            <img src={share} alt="share" className="w-4 h-4 mr-2" />
              Share
            </button>

            {/* <button 
            onClick={copyReferralLink}
             className="flex items-center justify-center w-1/2 py-5 rounded-lg  text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center  mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
              <img src={copy} alt="copy" className="w-5 h-5 mr-2" />
              {copied ? "copied" : "copy link"}
            </button> */}

          </div>

          {/* Stats Section
          <div className="flex justify-between items-center mt-4">
            <div className="bg-[#43433b] text-center p-4 rounded-lg w-1/2">
              <p className="text-lg font-bold">0 TGB</p>
              <p className="text-xs text-gray-400">
                10% of your friends earnings
              </p>
            </div>
          </div> */}

          {/* Frens List and Claim Button */}
          {/* <div className="flex justify-between items-center mt-4">
            <p className="text-sm font-bold">friends list</p>
            <button 
            className="py-3 px-3 text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
              Claim rewards
            </button>
          </div> */}
        </div>

        {/* No Frens Message
        <div className="mt-4 text-center text-sm text-gray-400">
          <p>You have no friends 🤷</p>
          <p>
            Refer your friends and family, get 10% of their earnings & unlock more
            rewards!
          </p>
        </div> */}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
          <div className="text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl">
          <button onClick={() => navigate('/')}>
            <img src={Earn} alt="Earn" className="w-8 h-8 mx-auto" />
            <p className="mt-1">Earn</p>
            </button>
          </div>
          <div className="text-center text-[#85827d] w-1/5">
          <button onClick={() => navigate('/LuckyWinPage')}>
          <img src={LuckyWin} alt="Luckywin" className="w-8 h-8 mx-auto" />
          <p className="mt-1">LuckyWin</p></button>
        </div>
          {/* <div className="text-center text-[#85827d] w-1/5">
            <button onClick={() => navigate('/MinePage')}>
            <img src={mine} alt="Mine" className="w-8 h-8 mx-auto" />
            <p className="mt-1">Mine</p></button>
          </div> */}
          <div className="text-center text-[#85827d] w-1/5">
            <img src={Activities} alt="Activities" className="w-8 h-8 mx-auto" />
            <p className="mt-1">Activities</p>
          </div>
          <div className="text-center text-[#85827d] w-1/5">
            <img src={Wallet} alt="Wallet" className="w-8 h-8 mx-auto" />
            <p className="mt-1">Wallet</p>
          </div>
        </div>
        </div>
  );
};

export default RefPage;