import { useNavigate } from 'react-router-dom';
import { Activities, Discipline, binanceLogo, Earn, LuckyWin, mine, one, Wallet, MEME_COIN, } from '../images';
import React, { useState, useEffect } from 'react';
import Settings from '../icons/Settings';   



const MinePage: React.FC = () => {
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

      const [levelIndex, setLevelIndex] = useState(6);
      const [points, setPoints] = useState(0);
      const profitPerHour = 100;
      //const pointsToAdd = 2;

      const [disciplinelevel, setDisciplineLevel] = useState<number>(() => {
        const savedLevel = localStorage.getItem("disciplinelevel");
        return savedLevel ? parseInt(savedLevel, 10) : 0;
      });

      const [patiencelevel, setPatienceLevel] = useState<number>(() => {
        const savedLevel = localStorage.getItem("patiencelevel");
        return savedLevel ? parseInt(savedLevel, 10) : 0;
      });

      const [claimedPoints, setClaimedPoints] = useState<number>(() => {
        const savedPoints = localStorage.getItem("claimedPoints");
        return savedPoints ? parseInt(savedPoints, 10) : 0;
      });

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
    
      // const formatProfitPerHour = (profit: number) => {
      //   if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
      //   if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
      //   if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
      //   return `+${profit}`;
      // };
    
      useEffect(() => {
        const pointsPerSecond = Math.floor(profitPerHour / 3600);
        const interval = setInterval(() => {
          setPoints(prevPoints => prevPoints + pointsPerSecond);
        }, 1000);
        return () => clearInterval(interval);
      }, [profitPerHour]);

      useEffect(() => {
        // Sync state with localStorage changes
        const savedPoints = localStorage.getItem("claimedPoints");
        const savedLevel = localStorage.getItem("level");
        if (savedPoints) setClaimedPoints(parseInt(savedPoints, 10));
        if (savedLevel) setDisciplineLevel(parseInt(savedLevel, 10));
        if (savedLevel) setPatienceLevel(parseInt(savedLevel, 10));
      }, []);

      const DisciplanehandleCardClick = (cardType: string) => {
        const currentDailyTaps = parseInt(localStorage.getItem("dailyTapsLeft") || "1500", 10);
    
        if (disciplinelevel >= 10) {
          alert("Maximum level reached! You can't upgrade further.");
          return;
        }
    
        if (claimedPoints >= 2000) {
          // Deduct 1k points
          const updatedPoints = claimedPoints - 2000;
          setClaimedPoints(updatedPoints);
          localStorage.setItem("claimedPoints", updatedPoints.toString());
    
          // Increase daily taps by 100
          const updatedDailyTaps = currentDailyTaps + 50;
          localStorage.setItem("dailyTapsLeft", updatedDailyTaps.toString());
    
          // Increment level
          const newLevel = disciplinelevel + 1;
          setDisciplineLevel(newLevel);
          localStorage.setItem("disciplinelevel", newLevel.toString());
    
          alert(`Successfully upgraded ${cardType} to level ${newLevel}!`);
        } else {
          alert("Not enough points!");
        }
      };

      const [pointsToAdd, setPointsToAdd] = useState<number>(() => {
        return parseInt(localStorage.getItem("PointsToAdd") || "2", 10);
      });

      const PatiencehandleCardClick = (cardType: string) => {
        if (patiencelevel >= 10) {
          alert("Maximum level reached! You can't upgrade further.");
          return;
        }
      
        if (claimedPoints >= 5000) {
          // Deduct 5000 points
          const updatedClaimedPoints = claimedPoints - 5000;
          setClaimedPoints(updatedClaimedPoints);
          localStorage.setItem("claimedPoints", updatedClaimedPoints.toString());
      
          // Increase coin collection by 0.1
          const updatedPointsToAdd = Number((pointsToAdd + 0.1).toFixed(2));
          setPointsToAdd(updatedPointsToAdd); // Ensure it's still a number
          localStorage.setItem("PointsToAdd", updatedPointsToAdd.toString());
          console.log("Updated PointsToAdd:", updatedPointsToAdd); // Debug log
      
          // Increment level
          const newPatienceLevel = patiencelevel + 1;
          setPatienceLevel(newPatienceLevel);
          localStorage.setItem("patiencelevel", newPatienceLevel.toString());
      
          alert(`Successfully upgraded ${cardType} to level ${newPatienceLevel}!`);
        } else {
          alert("Not enough points!");
        }
      };
      


  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <div className="px-4 z-10">
          <div className="flex items-center space-x-2 pt-4">
            <div className="p-1 rounded-lg bg-[#1d2025]">
            {/* <img src={gojo} alt="gojo" className="w-12 h-12"/> */}
            </div>
            {/* <div>
              <p className="text-sm">Aman (CEO)</p>
            </div> */}
            {/* <div className="flex items-center bg-[#272a2f] px-3 py-1 rounded-full translate-x-44">
              <img src={MEME_COIN} alt="dollarCoin" className="w-6 h-6 mr-2" />
              <p className="text-yellow-400">{claimedPoints}</p>
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
                <p className="text-xs text-[#85827d] font-medium">Profit per hour</p>
                <div className="flex items-center justify-center space-x-1">
                <img src={MEME_COIN} alt="dollarCoin" className="w-5 h-5 mr-2" />
                <p className="text-yellow-400">{claimedPoints}</p>
                </div>
              </div>
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <Settings className="text-white" />
            </div>
          </div>
        </div>


      {/* Cards Section */}
      <div className=" flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="overflow-y-auto absolute top-[2px] left-0 right-0 bottom-0 bg-[#131313] rounded-t-[46px]">

            {/* Tab Menu */}
            <div className="p-2 rounded-lg flex flex-row sm:flex-row justify-between mb-16 mt-10 border-solid border-1 border-[#444444]">
                <button className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm">
                <p>Skills</p>
                </button>
                {/* <button onClick={() => navigate('/BussinessPage')} className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm">
                <div className="dot232"></div>
                <p>Business</p>
                </button> */}
                {/* <button onClick={() => navigate('/SpecialsPage')} className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm">
                <p>Specials</p>
                </button> */}
            </div>

        {/*s Card Section */}
      <div className="p-8 grid grid-cols-2 gap-4 mb-20">
        {/* Card 1: Patience */}
        <div 
        onClick={() => PatiencehandleCardClick("Patience")}
        className="bg-[#2b2b2b] p-5 rounded-2xl text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
        >
        {/* Icon */}
        <img
          src={one}
          alt="patience"
          className="mx-auto  w-12 sm:w-16 h-12 sm:h-16"
        />

        {/* Title */}
        <h2 className="mt-5 text-[20px] sm:text-[24px] text-white">Patience</h2>

        {/* Profit per hour */}
        <p className="text-gray-400 flex justify-center items-center mt-1 space-x-2 text-[12px]">
          <span className="text-[12px]">Upgarde Coin Collection </span>
          <img src={MEME_COIN} alt="Dollar Coin" className="w-[15px] h-[15px]" />
          <span>+0.1</span>
        </p>

        {/* Divider */}
        <div className="h-[1px] bg-[#444444] rounded-lg mt-5"></div>
        
        {/* Small line */}
        <div className="h-[25px] sm:h-[35px] w-[2px] bg-[#43433b] mx-auto mt-2"></div>

        {/* Level and Coin Info */}
        <div className="flex justify-between items-center translate-y-[-1.5rem] sm:translate-y-[-2rem] text-[12px] sm:text-[14px]">
          <span className="text-gray-400 text-base sm:text-xl ml-4">lvl {patiencelevel}</span>
          <div className="flex items-center">
            <span className="text-yellow-400 text-base sm:text-xl">5k</span>
            <img src={MEME_COIN} alt="Dollar Coin" className="w-[12px] sm:w-[15px] h-[12px] sm:h-[15px] translate-x-[-2rem] sm:translate-x-[-3rem]" />
          </div>
        </div>
      </div>

        {/* Card 2: Discipline */}
        <div 
        onClick={() => DisciplanehandleCardClick("Discipline")}
        className="bg-[#2b2b2b] p-5 rounded-2xl text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
        >
        {/* Icon */}
        <img
          src={Discipline}
          alt="discipline"
          className="mx-auto  w-12 sm:w-16 h-12 sm:h-16"
        />

        {/* Title */}
        <h2 className="mt-5 text-[20px] sm:text-[24px] text-white">Discipline</h2>

        {/* Profit per hour */}
        <p className="text-gray-400 flex justify-center items-center mt-1 space-x-2 text-[12px]">
          <span className="text-[12px]">Increase Clicks</span>
          <img src={MEME_COIN} alt="Dollar Coin" className="w-[15px] h-[15px]" />
          <span>+50</span>
        </p>

        {/* Divider */}
        <div className="h-[1px] bg-[#444444] rounded-lg mt-5"></div>
        
        {/* Small line */}
        <div className="h-[25px] sm:h-[35px] w-[2px] bg-[#43433b] mx-auto mt-2"></div>

        {/* Level and Coin Info */}
        <div className="flex justify-between items-center translate-y-[-1.5rem] sm:translate-y-[-2rem] text-[12px] sm:text-[14px]">
          <span className="text-gray-400 text-base sm:text-xl ml-4">
            lvl {disciplinelevel}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-400 text-base sm:text-xl">2k</span>
            <img src={MEME_COIN} alt="Dollar Coin" className="w-[12px] sm:w-[15px] h-[12px] sm:h-[15px] translate-x-[-2rem] sm:translate-x-[-3rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

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
        <div className="text-center text-[#85827d] w-1/5">
          <img src={mine} alt="Mine" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Mine</p>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
          <button onClick={() => navigate('/Activities')}>
          <img src={Activities} alt="Activities" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Activities</p></button>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
          <button onClick={() => navigate('/WalletPage')}>
          <img src={Wallet} alt="Wallet" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Wallet</p>
          </button>
        </div>
        </div>
        </div>

  );
};

export default MinePage;