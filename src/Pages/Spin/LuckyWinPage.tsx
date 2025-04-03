import { useNavigate } from 'react-router-dom';
import { Activities,  Earn, LuckyWin, mine, Wallet, gojo, binanceLogo, MEME_COIN,  } from '../../images';
import React, { useState, useEffect, } from 'react';
import Info from '../../icons/Info';
import Settings from '../../icons/Settings';
import './LuckyWinPage.css'

const LuckyWinPage = () => {
  const navigate = useNavigate();
  
  const levelNames = [
    "Bronze", "Silver", "Gold", "Platinum", "Diamond", 
    "Epic", "Legendary", "Master", "GrandMaster", "Lord"
  ];
  const levelMinPoints = [0, 5000, 25000, 100000, 1000000, 2000000, 10000000, 50000000, 100000000, 1000000000];
  
  const symbols = ["7️⃣", "❌", "🍓", "🍋", "🍉", "🍒", "💵", "🍊", "🍎"];
  
  const [levelIndex, setLevelIndex] = useState(6);
  const [points, setPoints] = useState(0);
  const profitPerHour = 100;
  //const [claimedPoints, setClaimedPoints] = useState(0);
  const [reelSymbols, setReelSymbols] = useState(["🍒", "🍋", "🍊"]); // Default symbols for reels

  const [claimedPoints, setClaimedPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem("claimedPoints");
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("claimedPoints", claimedPoints.toString());
  }, [claimedPoints]);

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
      }, [points, levelIndex, levelMinPoints, levelNames.length]);
    
      const formatProfitPerHour = (profit: number) => {
        if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
        if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
        if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
        return `+${profit}`;
      };
    
      useEffect(() => {
        const pointsPerSecond = Math.floor(profitPerHour / 3600);
        const interval = setInterval(() => {
          setPoints(prevPoints => prevPoints + pointsPerSecond);
        }, 1000);
        return () => clearInterval(interval);
      }, [profitPerHour]);

  // Spin reels with random symbols and update UI
  const spinReels = () => {
    const rollingDuration = 2000; // Total rolling time in milliseconds
    const updateInterval = 100; // Interval between updates in milliseconds
    const endTime = Date.now() + rollingDuration;
  
    const roll = () => {
      if (Date.now() >= endTime) {
        // Stop rolling and set the final symbols
        const reel1 = symbols[Math.floor(Math.random() * symbols.length)];
        const reel2 = symbols[Math.floor(Math.random() * symbols.length)];
        const reel3 = symbols[Math.floor(Math.random() * symbols.length)];
        setReelSymbols([reel1, reel2, reel3]);
        checkWin(reel1, reel2, reel3);
        return;
      }
  
      // Update with random symbols to simulate rolling
      const randomReel1 = symbols[Math.floor(Math.random() * symbols.length)];
      const randomReel2 = symbols[Math.floor(Math.random() * symbols.length)];
      const randomReel3 = symbols[Math.floor(Math.random() * symbols.length)];
      setReelSymbols([randomReel1, randomReel2, randomReel3]);
  
      // Schedule the next update
      setTimeout(roll, updateInterval);
    };
  
    // Start rolling
    roll();
  };

  // Check win conditions and set reward messages
  const checkWin = (reel1, reel2, reel3) => {
    const resultElement = document.getElementById('result');
    const rewardElement = document.getElementById('reward');

    if (reel1 === reel2 && reel2 === reel3) {
      resultElement.innerText = '🎉 You win! 🎉';
      rewardElement.innerText = 'Reward: 0.5 Coins!';
      setPoints(points + 0.5);
    
    } else {
      resultElement.innerText = 'Try again!';
      rewardElement.innerText = '';
    }
  };

  // Claim points
  const handleClaimClick = () => {
    if (points > 0) {
      setClaimedPoints(claimedPoints + points);
      setPoints(0);
    }
  };

  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        {/* Header and Level Progress */}
        <div className="px-4 z-10">
          <div className="flex items-center space-x-2 pt-4">
            <div className="p-1 rounded-lg bg-[#1d2025]">
              {/* <img src={gojo} alt="gojo" className="w-12 h-12" /> */}
            </div>
            {/* <div>
              <p className="text-sm">Aman (CEO)</p>
            </div> */}
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
                <p className="text-xs text-[#85827d] font-medium">Spin Earning</p>
                <div className="flex items-center justify-center space-x-1">
                  <img src={MEME_COIN} alt="Dollar Coin" className="w-[18px] h-[18px]" />
                  <p className="text-sm">{claimedPoints}</p>
                  <Info size={20} className="text-[#43433b]" />
                </div>
              </div>
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <Settings className="text-white" />
            </div>
          </div>
        </div>

        {/* Slot Machine */}
        <div className="flex-grow mt-10 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-[3px] left-0 right-0 bottom-0 bg-[#131313] rounded-t-[46px] flex flex-col items-center justify-center min-h-screen">
            <p className="text-white mb-5 text-[25px] font-sans">Lucky Spin & Win</p>
            <div className="bg-[#444444] mb-10 rounded-3xl px-3 py-10 relative">
              <div className="bg-[#585858] rounded-3xl px-5 py-5 relative">
                <div className="slots">
                  <div className="doors flex">
                    <div className="reel bg-[#1f1f1f] shadow-inner w-[100px] h-[150px] flex items-center justify-center rounded-lg m-1">
                      <span id="reel1">{reelSymbols[0]}</span>
                    </div>
                    <div className="reel bg-[#1f1f1f] shadow-inner w-[100px] h-[150px] flex items-center justify-center rounded-lg m-1">
                      <span id="reel2">{reelSymbols[1]}</span>
                    </div>
                    <div className="reel bg-[#1f1f1f] shadow-inner w-[100px] h-[150px] flex items-center justify-center rounded-lg m-1">
                      <span id="reel3">{reelSymbols[2]}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="buttons mt-6 w-full">
                <button
                  id='reward'
                  onClick={handleClaimClick}
                  className="font-sans w-full text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg px-3 py-3 text-center dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                >
                  Claim Earned Coins
                </button>
                {/* <button
                  onClick={spinReels}
                  className="bg-[#f4bc5f] text-black rounded-full font-extrabold text-[20px] w-20 h-20 flex items-center justify-center"
                >
                  Spin
                </button> */}
              </div>
              <div id="result" className="mt-4 text-white text-center font-sans"></div>
            </div>
            <div className=" relative flex justify-center bg-[#4e4113] p-2 rounded-full">
              <button
                id="spinButton"
                onClick={spinReels}
                className=" bg-[#f4bc5f] text-black rounded-full font-extrabold text-[20px] w-20 h-20 flex items-center justify-center"
                >
                  SPIN
                </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#444444] flex justify-around items-center z-50 rounded-3xl text-xs">
         <div className="text-center text-[#85827d] w-1/5 m-1 p-2 rounded-2xl">
         <button onClick={() => navigate('/')}>
           <img src={Earn} alt="Earn" className="w-8 h-8 mx-auto" />
           <p className="mt-1">Earn</p></button>
         </div>
         <div className="text-center text-[#85827d] w-1/5">
           <img src={LuckyWin} alt="Luckywin" className="w-8 h-8 mx-auto" />
           <p className="mt-1">LuckyWin</p>
         </div>
         <div className="text-center text-[#85827d] w-1/5">
           <button onClick={() => navigate('/MinePage')}>
           <img src={mine} alt="Mine" className="w-8 h-8 mx-auto" />
           <p className="mt-1">Mine</p></button>
         </div>
         <div className="text-center text-[#85827d] w-1/5">
         <button onClick={() => navigate('/activities')}>
           <img src={Activities} alt="Activities" className="w-8 h-8 mx-auto" />
           <p className="mt-1">Activities</p></button>
         </div>
         <div className="text-center text-[#85827d] w-1/5">
           <img src={Wallet} alt="Wallet" className="w-8 h-8 mx-auto" />
           <button onClick={() => navigate('/WalletPage')}>
           <p className="mt-1">Wallet</p></button>
         </div>
       </div>
      </div>
    </div>
  );
};

export default LuckyWinPage;