import { Activities, youtubeicon, usercomments, Earn, Wallet, LuckyWin, rightArrow, copy, share, MEME_COIN } from '../../images';
import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import { db } from '../firebase';
import { setDoc, doc, getDoc, increment } from 'firebase/firestore';
import {getAuth, onAuthStateChanged } from "firebase/auth";


const RefPage: React.FC = () => {

  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [referrer, setReferrer] = useState<string | null>(null);
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  const [user, setUser] = useState<any>(null);

  const [claimedPoints, setClaimedPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem("claimedPoints");
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });

    // Use Firebase Auth to detect user state
    useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // Set the actual authenticated user
      } else {
        setUser(null); // No user is authenticated
      }
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  const handleShareAndEarnPoints = async () => {
    console.log("handleShareAndEarnPoints called");

    if (user) {
      console.log("User detected:", user);

      const userRef = doc(db, 'users', user.uid);
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          console.log("User document exists in Firestore");
          const userData = userDoc.data();
          const updatedPoints = (userData?.points || 0) + 100;
          await setDoc(userRef, { points: updatedPoints }, { merge: true });
          console.log("Points updated:", updatedPoints);
        } else {
          console.log("User document does not exist in Firestore");
        }
      } catch (error) {
        console.error("Error handling Firestore operation:", error);
      }
    } else {
      console.log("No user detected");
    }
  };
  

 // Handle referral logic from URL
 useEffect(() => {
  console.log("Current URL:", window.location.href); // Debugging log
  const urlParams = new URLSearchParams(window.location.search);
  const referralId = urlParams.get("ref");
  console.log("Referral ID in URL:", referralId); // Debugging log

  if (referralId) {
    setReferrer(referralId);
    console.log("Referral ID found:", referralId);
    handleReferral(referralId); // Handle the referral
  } else {
    console.log("No referral ID found in URL");
  }
}, []);

// Handle referral processing
const handleReferral = async (referralId: string) => {
  const referrerDocRef = doc(db, "users", referralId);

  try {
    const referrerDoc = await getDoc(referrerDocRef);
    if (referrerDoc.exists()) {
      console.log("Referrer found in Firestore:", referralId);
      // Update referrer's points in Firestore
      await setDoc(referrerDocRef, { points: increment(10) }, { merge: true });
      console.log("Referrer points updated");
    }

    // Award points to the new user (authenticated or not)
    const newUserDocRef = doc(db, "users", referralId); // Using referralId as the new user's ID
    await setDoc(
      newUserDocRef,
      { points: increment(100) }, // New user gets 100 points
      { merge: true }
    );
    setClaimedPoints((prev) => prev + 100);
    localStorage.setItem("claimedPoints", String(claimedPoints + 100));
    console.log("New user points updated");

  } catch (error) {
    console.error("Error handling referral:", error);
  }
};


  // Generate and copy referral link
  const copyReferralLink = () => {
    if (user) {
      const referralLink = `https://t.me/ThoughGoldBullGroup?ref=${user.uid}`;
      console.log("Referral link:", referralLink); // Debugging log
      navigator.clipboard.writeText(referralLink).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }).catch((err) => {
        console.error("Failed to copy referral link:", err);
      });
    }
  };

  // Reward the user for sharing the link
  const rewardUser = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const Points = (userData?.points || 0) + 100; // Add 100 points
        await setDoc(userRef, { points: Points }, { merge: true });
        alert("You earned 100 points for sharing!");
      }
    }
  };

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
            <p className="text-yellow-400">{claimedPoints}</p>
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
            onClick={handleOpenPopup}
            className="flex items-center justify-center w-1/2 py-5 rounded-lg mr-2  text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
            <img src={share} alt="share" className="w-4 h-4 mr-2" />
              Share
            </button>

            <button 
            onClick={copyReferralLink}
             className="flex items-center justify-center w-1/2 py-5 rounded-lg  text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center  mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
              <img src={copy} alt="copy" className="w-5 h-5 mr-2" />
              {copied ? "copied" : "copy link"}
            </button>

          </div>

          {/* Stats Section */}
          <div className="flex justify-between items-center mt-4">
            <div className="bg-[#43433b] text-center p-4 rounded-lg w-1/2">
              <p className="text-lg font-bold">{points} TGB</p>
              <p className="text-xs text-gray-400">
                10% of your friends earnings
              </p>
            </div>
          </div>

          {/* Frens List and Claim Button */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm font-bold">friends list</p>
            <button
            onClick={rewardUser} 
            className="py-3 px-3 text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
              Claim rewards
            </button>
          </div>
        </div>

{isPopupOpen && (
        <div className="flex fixed flex-col top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] items-center justify-center z-50">
          <div className="bg-[#272a2f] rounded-2xl max-w-sm sm:w-[80%] md:w-[50%] p-10 sm:p-8 ">
               {/* Share on Telegram Button */}
            <button
              onClick={handleShareAndEarnPoints}
              className="flex items-center gap-2 text-white no-underline mb-4 hover:text-yellow-400 transition"
            >
              Telegram
            </button>

            <button onClick={handleClosePopup} className="flex mt-4 border-[2px] px-2 border-yellow-400 dark:hover:bg-yellow-400 rounded">
            Close
            </button>
          </div>
        </div>
      )}

      {/* {isPopupOpen && (
        <div onClick={handleClosePopup} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 999
        }} />
      )} */}


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