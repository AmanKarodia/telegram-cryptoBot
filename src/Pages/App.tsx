import React, { useState, useEffect } from 'react';
import './App.css'
import { Activities, binanceLogo, dailyReward, dollarCoin, Earn, LuckyWin, MEME_COIN, memeCoin, mine, time, Wallet } from '../images';
import Info from '../icons/Info';
import Settings from '../icons/Settings';
import { useNavigate } from 'react-router-dom';
import { getNextResetTime, shouldResetClicks, initializeResetTime, } from '../utils/timerUtils';
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase"; // Adjust path to your Firebase config




const App: React.FC = () => {
  const navigate = useNavigate();

  const levelNames = [
    "Bronze",    // From 0 to 4999 coins
    "Silver",    // From 5000 coins to 24,999 coins
    "Gold",      // From 25,000 coins to 99,999 coins
    "Platinum",  // From 100,000 coins to 999,999 coins
    "Diamond",   // From 1,000,000 coins to 2,000,000 coins
    "Epic",      // From 2,000,000 coins to 10,000,000 coins
    "Legendary", // From 10,000,000 coins to 50,000,000 coins
    "Master",    // From 50,000,000 coins to 100,000,000 coins
    "GrandMaster", // From 100,000,000 coins to 1,000,000,000 coins
    "Lord"       // From 1,000,000,000 coins to ∞
  ];

  const levelMinPoints = [
    0,        // Bronze
    5000,     // Silver
    25000,    // Gold
    100000,   // Platinum
    1000000,  // Diamond
    2000000,  // Epic
    10000000, // Legendary
    50000000, // Master
    100000000,// GrandMaster
    1000000000// Lord
  ];

  //const [dailyTapsLeft, setDailyTapsLeft] = useState(1500);
  const [levelIndex, setLevelIndex] = useState(6);
  const [points, setPoints] = useState(0);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [resetTime, setResetTime] = useState<number>(() => initializeResetTime());
  //const [claimedPoints, setClaimedPoints] = useState(0); // Points that have been claimed
  const profitPerHour = 100;
  const [user, setUser] = useState<any>(null);

  // Initialize state with the value from localStorage or default to 0
  const [claimedPoints, setClaimedPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem("claimedPoints");
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });

   // Initialize dailyTapsLeft from localStorage or default to 1500
   const [dailyTapsLeft, setDailyTapsLeft] = useState<number>(() => {
    const savedTaps = localStorage.getItem("dailyTapsLeft");
    return savedTaps ? parseInt(savedTaps, 10) : 500;
  });

  const [pointsToAdd, setPointsToAdd] = useState<number>(() => {
    return parseInt(localStorage.getItem("PointsToAdd") || "0", 10);
  });

  // Update localStorage whenever claimedPoints changes
  useEffect(() => {
    localStorage.setItem("claimedPoints", claimedPoints.toString());
  }, [claimedPoints]);

  useEffect(() => {
    // Save the updated value of dailyTapsLeft to localStorage
    localStorage.setItem("dailyTapsLeft", dailyTapsLeft.toString());
  }, [dailyTapsLeft]);
  
  // Get any exsiting data in local storage
  // useEffect(() => {
  //   const data = window.localStorage.getItem('SavedClaimedPoints')
  //   if (data !== null) setClaimedPoints(JSON.parse(data))

  //   //   const SavedClaimedPoints = localStorage.getItem('ClaimedPoints');
  //   //   SavedClaimedPoints ? setClaimedPoints(claimedPoints) : claimedPoints;
  //   //   console.log('Getting from Local Storage:', { SavedClaimedPoints });
  //   }, [])
    
  //   // Report saved points to local storage
  //   useEffect(() => {
  //     window.localStorage.setItem('SavedClaimedPoints', JSON.stringify(claimedPoints));
  
  //     console.log({ claimedPoints });
  //   }, [claimedPoints]);
    

      // Function to handle the click event on a card
    
      const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (dailyTapsLeft <= 0) return;
  
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Apply the rotation effect
      card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
      
      // Reset the transform after 100ms
      setTimeout(() => {
        card.style.transform = '';
      }, 100);

      //figue out how to Increase coin collection by 0.1
      const updatedPointsToAdd = pointsToAdd;
      setPointsToAdd(updatedPointsToAdd);
      localStorage.setItem("PointsToAdd", updatedPointsToAdd.toString());


      // Update points and track the click position
      setPoints(points + pointsToAdd)
      setPointsToAdd(updatedPointsToAdd);
      setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
      localStorage.setItem("PointsToAdd", updatedPointsToAdd.toString());
    
      // Decrease the number of taps left
      setDailyTapsLeft(dailyTapsLeft - 1);
    };

    // Handle "Claim" button click
 const handleClaimClick = () => {
    if (claimedPoints >= 0) {
      setClaimedPoints((prevPoints) => prevPoints + pointsToAdd);
      setPoints(0); // reset points
    }
  };

  // const handleClaimClick = () => {
  //   if (points > 0) {
  //     setClaimedPoints((prevClaimedPoints) => prevClaimedPoints + points); // Add to claimed points // Add points to claimed points
  //     setPoints(0); // Reset total points
  //   }
  // };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  useEffect(() => {
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else if (points < currentLevelMin && levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
    }
  }, [points, levelIndex, levelMinPoints, levelNames.length, setLevelIndex]);

  const formatProfitPerHour = (profit: number) => {
    if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
    if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
    if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
    return `+${profit}`;
  };

  useEffect(() => {
    const pointsPerSecond = Math.floor(profitPerHour / 3600);
    const interval = setInterval(() => {
      setPoints((prevPoints) => prevPoints + pointsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [profitPerHour]);

   // Check if it's time to reset the taps
   useEffect(() => {
    const interval = setInterval(() => {
      if (shouldResetClicks(resetTime)) {
        setDailyTapsLeft(1500);
        const nextResetTime = getNextResetTime();
        setResetTime(nextResetTime);
        localStorage.setItem("resetTime", nextResetTime.toString());
        localStorage.setItem("dailyTapsLeft", "500");
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [resetTime]);

  useEffect(() => {
    const auth = getAuth();
  
    // Sign in anonymously if no user is logged in
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        signInAnonymously(auth)
          .then((userCredential) => {
            console.log("User signed in anonymously:", userCredential.user.uid);
          })
          .catch((error) => {
            console.error("Error signing in anonymously:", error);
          });
      } else {
        setUser(firebaseUser);
      }
    });
  
    return () => unsubscribe();
  }, []);

  // Load points from Firestore and sync with localStorage
useEffect(() => {
  const loadPointsFromFirestore = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          const savedPoints = data?.points || 0;
          const savedTaps = data?.dailyTapsLeft || 1500;

          // Sync Firestore data with local state
          setClaimedPoints(savedPoints);
          setDailyTapsLeft(savedTaps);

          // Sync with localStorage
          localStorage.setItem("claimedPoints", savedPoints.toString());
          localStorage.setItem("dailyTapsLeft", savedTaps.toString());
        } else {
          // Create a new Firestore document
          await setDoc(userDocRef, { points: 0, dailyTapsLeft: 1500 });
        }
      } catch (error) {
        console.error("Error loading data from Firestore:", error);
      }
    }
  };

  loadPointsFromFirestore();
}, [user]);

  // Sync claimedPoints and dailyTapsLeft to Firestore
useEffect(() => {
  const syncToFirestore = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      try {
        await updateDoc(userDocRef, {
          points: claimedPoints,
          dailyTapsLeft,
        });
      } catch (error) {
        console.error("Error syncing data to Firestore:", error);
      }
    }
  };

  syncToFirestore();
}, [claimedPoints, dailyTapsLeft, user]);


  // Example function to add points
  const addPoints = (amount: number) => {
    setClaimedPoints((prev) => prev + amount);
  };

  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <div className="px-4 z-10">
          <div className="flex items-center space-x-2 pt-4">
            <div className="p-1 rounded-lg bg-[#1d2025]">
            {/* <img src={gojo} alt="gojo" className="w-12 h-12"/> */}
            </div>
            {/* {user ? (
        <div>
          <h2>Welcome, {user.first_name}!</h2>
          {user.photo_url && (
            <img
              src={user.photo_url}
              alt="User Avatar"
              style={{ width: "50px", borderRadius: "50%" }}
            />
          )}
        </div>
      ) : (
        <p className="text-sm">Loading user information...</p>
      )} */}
          </div>
          <div className="flex items-center justify-between space-x-4 mt-1">
            <div className="flex items-center w-1/3">
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="text-sm">{levelNames[levelIndex]}</p>
                  <p className="text-sm">{levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span></p>
                </div>
                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                  <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                    <div className="progress-gradient h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
              <img src={binanceLogo} alt="Exchange" className="w-8 h-8" />
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <div className="flex-1 text-center">
                <p className="text-xs text-[#85827d] font-medium">Profit per hour</p>
                <div className="flex items-center justify-center space-x-1">
                  <img src={dollarCoin} alt="Dollar Coin" className="w-[18px] h-[18px]" />
                  <p className="text-sm">{formatProfitPerHour(profitPerHour)}</p>
                  <Info size={20} className="text-[#43433b]" />
                </div>
              </div>
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <button onClick={() => navigate('/SettingsPage')}>
              <Settings className="text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#131313] rounded-t-[46px]">
            <div className="px-4 mt-6 flex justify-between gap-2">
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <img src={dailyReward} alt="Daily Reward" className="mx-auto w-8 h-8" />
                <p className="text-[10px] text-center text-white mt-1">Taps Left</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyTapsLeft}</p>
              </div>

              {/* <div className="bg-[#272a2f] rounded-lg px-4 py-3 w-full relative">
                <img src={rocket} alt="boosters" className="mx-auto w-8 h-8" />
                <p className="text-[10px] text-center text-white mt-2">Get Boosters</p>
              </div> */}

              <div className="bg-[#272a2f] rounded-lg px-4 py-3 w-full relative">
                <img src={time} alt="boosters" className="mx-auto w-5 h-5" />
                <p className="text-[10px] text-center text-white mt-2">clicks regeneration</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{new Date(resetTime).toLocaleString()}</p>
              </div>
            </div>
            <div className="px-4 mt-8 flex justify-center">
              <div className="px-4 py-2 flex items-center space-x-2">
                <img src={MEME_COIN} alt="Dollar Coin" className="w-8 h-8" />
                <p className="text-4xl text-white">  {claimedPoints !== null ? claimedPoints : "Loading..."} <span className="text-[#f3ba2f]">TGB</span></p>
            </div>
            </div>

            <div className="mx-auto circle-inner" onClick={handleCardClick}>
                  <img src={memeCoin} alt="Main Character" className="w-full h-full" />
                  {dailyTapsLeft <= 0 && <p className="absolute text-[20px]">No more taps left for today!</p>}
            </div>
            
            <div className="bg-[#272a2f] rounded-lg px-4 py-3 w-[75%] flex mx-auto">
                  <button onClick={handleClaimClick} disabled={points <= 0} type="button" className="mt-1 mx-auto  text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 ">Claim</button>
              <div className="px-4 py-2 absolute flex space-x-2 ">
                <p className="text-4xl text-white">{points} <span className="text-[#f3ba2f]">TGB</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom fixed div */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
        <div className="text-center text-[#85827d] w-1/5  m-1 p-2 rounded-2xl">
        <img src={Earn} alt="Earn" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Earn</p>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
          <button onClick={() => navigate('/LuckyWinPage')}>
          <img src={LuckyWin} alt="Luckywin" className="w-8 h-8 mx-auto" />
          <p className="mt-1">LuckyWin</p></button>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
          <button onClick={() => navigate('/MinePage')} >
          <img src={mine} alt="Mine" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Mine</p></button>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
        <button onClick={() => navigate('/Activities')}>
          <img src={Activities} alt="Activities" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Activities</p>
        </button>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
          <button onClick={() => navigate('/WalletPage')}>
          <img src={Wallet} alt="Wallet" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Wallet</p>
          </button>
        </div>
      </div>

      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))}
    </div>
  );
};

export default App;