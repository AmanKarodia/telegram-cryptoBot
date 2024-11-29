import { Activities, youtubeicon, usercomments, Earn, Wallet, LuckyWin, rightArrow, share, MEME_COIN } from '../../images';
import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, increment, getDoc, getFirestore, onSnapshot } from "firebase/firestore";


const RefPage: React.FC = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [claimedPoints, setClaimedPoints] = useState<number | null>(null);

   // Handle Firebase anonymous login and user state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // Store the user if authenticated anonymously
      } else {
        // Sign in anonymously if no user is authenticated
        signInAnonymously(auth)
          .then((userCredential) => {
            setUser(userCredential.user); // Save the new anonymous user
          })
          .catch((error) => {
            console.error("Error signing in anonymously:", error);
          });
      }
    });

    return () => unsubscribe();
  }, []);



  // Firebase Auth: Anonymous Authentication
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        signInAnonymously(auth)
          .then((userCredential) => {
            setUser(userCredential.user);
          })
          .catch((error) => {
            console.error("Error signing in anonymously:", error);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch points from Firebase
  useEffect(() => {
    const fetchPoints = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
  
          if (userDoc.exists()) {
            // Fetch and set existing points
            const data = userDoc.data();
            setClaimedPoints(data.points || 0);
          } else {
            console.log("User document does not exist. Initializing...");
            // Initialize the user document with 0 points (if not already created)
            await setDoc(userDocRef, { points: 0 }, { merge: true });
            setClaimedPoints(0);
          }
        } catch (error) {
          console.error("Error fetching points:", error);
        }
      }
    };
  
    fetchPoints();
  }, [user]);

  // Handle the referral link sharing
  const handleShare = async () => {
    if (!user) {
      alert("You must be logged in to share your link.");
      return;
    }

    const referralLink = `${window.location.origin}?ref=${user.uid}`;
    try {
      // Award points to the user who shares the link (referrer)
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        { points: increment(100) }, // Award 100 points for sharing the link
        { merge: true }
      );
      console.log("100 points awarded for sharing the link");

      // Use Web Share API (for mobile) or copy the link to the clipboard (desktop fallback)
      if (navigator.share) {
        await navigator.share({
          title: "Check this out!",
          text: "Join my referral link and get 100 points!",
          url: referralLink,
        });
      } else {
        navigator.clipboard.writeText(referralLink);
        alert("Referral link copied to clipboard! Share it with others.");
      }
    } catch (error) {
      console.error("Error sharing referral link:", error);
    }
  };

  const db = getFirestore();

  // Fetch points from Firestore
  const fetchPoints = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        setClaimedPoints(data.points || 0); // Default to 0 if no points
      } else {
        console.log("User document does not exist.");
        setClaimedPoints(0);
      }
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    // Anonymous sign-in function
    const signIn = async () => {
      try {
        const userCredential = await signInAnonymously(auth);
        setUser(userCredential.user);
        fetchPoints(userCredential.user.uid); // Fetch points after sign-in
      } catch (error) {
        console.error("Error signing in anonymously:", error);
      }
    };

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        fetchPoints(firebaseUser.uid); // Fetch points for authenticated user
      } else {
        signIn();
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Real-time listener for points changes
  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setClaimedPoints(data.points || 0); // Update points in real-time
        }
      });

      return () => unsubscribe(); // Cleanup real-time listener
    }
  }, [user]);


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