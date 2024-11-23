import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Activities, dollarCoin, Earn, LuckyWin, mine, Wallet, gojo, binanceLogo, memeCoin, pic1, tonCoin, pic2, pic3, pic4, } from '../../images';
import Info from '../../icons/Info';
import Settings from '../../icons/Settings';  



const SpecialsPage: React.FC = () => {
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

        useEffect(() => {
          // Create a script tag dynamically
          const script = document.createElement('script');
          script.src = "https://cdn.jsdelivr.net/npm/@telegram-web-app/sdk";
          script.type = "module"; // Set the type to "module"
          script.async = true; // Ensure the script loads asynchronously
          document.body.appendChild(script);
      
          // Clean up the script when the component is unmounted
          return () => {
            document.body.removeChild(script);
          };
        }, []); // Empty dependency array ensures it runs only once when the component mounts

  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <div className="px-4 z-10">
          <div className="flex items-center space-x-2 pt-4">
            <div className="p-1 rounded-lg bg-[#1d2025]">
            <img src={gojo} alt="gojo" className="w-12 h-12"/>
            </div>
            <div>
              <p className="text-sm">Aman (CEO)</p>
            </div>
            <div className="flex items-center bg-[#272a2f] px-2 py-1 rounded-full translate-x-32 sm:translate-x-32">
              <img src={memeCoin} alt="dollarCoin" className="w-6 h-6 mr-2" />
              <p className="text-yellow-400">{points.toLocaleString()}</p>
            </div>
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
              <Settings className="text-white" />
            </div>
          </div>
        </div>


      {/* Cards Section */}
      <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="overflow-y-auto absolute top-[2px] left-0 right-0 bottom-0 bg-[#131313] rounded-t-[46px]">

            {/* Tab Menu */}
            <div className="p-5 rounded-lg flex flex-row sm:flex-row justify-between mb-16 mt-10 border-solid border-1 border-[#444444]">
                <button onClick={() => navigate('/MinePage')} className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm">
                <p>Skills</p>
                </button>
                {/* <button onClick={() => navigate('/BussinessPage')} className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm">
                <div className="dot232"></div>
                <p>Business</p>
                </button> */}
                <button className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm">
                <p>Specials</p>
                </button>
            </div>

        {/* Card Section */}
        <div className="p-4 grid grid-cols-2 gap-4 mb-20">
        {/* Card 1: AirDrop Hunter */}
        <button 
        //onClick={sendTelegramData}
        className="bg-gradient-to-b from-custom-purple to-black p-5 rounded-2xl text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
        >
        {/* Icon */}
        <img
          src={pic1}
          alt="patience"
          className="mx-auto w-28 h-20 rounded-2xl"
        />

        {/* Title */}
        <h2 className="mt-5 text-[15px]">Airdrop Hunter</h2>

        {/* withdrawal access */}
        <p className="text-gray-400 flex justify-center items-center mt-1 space-x-2">
          <span className="text-[15px] text-[#b2b2b5]">Withdrawal Access</span>
        </p>

        {/* */}
        {/* <p className="text-gray-400 flex justify-center items-center mt-1 space-x-2">
          <span className="text-[15px] text-[#b2b2b5]">Profit</span>
          <img src={tonCoin} alt="Dollar Coin" className="w-[15px] h-[15px]" />
          <span className="text-[#b2b2b5]">1.5 Ton</span>
        </p> */}

        {/* Divider */}
        <div className="h-[1px] bg-[#444444] rounded-lg mt-5"></div>

        {/* Level and Coin Info */}
        <div className="flex justify-center gap-4 items-center mt-3">
            <img src={tonCoin} alt="Dollar Coin" className="w-[15px] h-[15px]" />
            <span className="text-[20px]">0.5 TON</span>
        </div>
      </button>



        {/* Card 2: Early Access */}
        <div className="bg-gradient-to-b from-black to-[#bc560a] p-5 rounded-2xl text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
        {/* Icon */}
        <img
          src={pic2}
          alt="patience"
          className="mx-auto w-28 h-20 rounded-2xl"
        />

        {/* Title */}
        <h2 className="mt-5 text-[15px]">Early Access</h2>

        {/* withdrawal access */}
        <p className="text-gray-400 flex justify-center items-center mt-1 space-x-2">
          <span className="text-[15px] text-[#b2b2b5]">Withdrawal Access</span>
        </p>

        {/* */}
        {/* <p className="text-gray-400 flex justify-center items-center mt-1 space-x-2">
          <span className="text-[15px] text-[#b2b2b5]">Profit</span>
          <img src={tonCoin} alt="Dollar Coin" className="w-[15px] h-[15px]" />
          <span className="text-[#b2b2b5]">2 Ton</span>
        </p> */}

        {/* Divider */}
        <div className="h-[1px] bg-[#444444] rounded-lg mt-5"></div>

        {/* Level and Coin Info */}
        <div className="flex justify-center gap-4 items-center mt-3">
            <img src={tonCoin} alt="Dollar Coin" className="w-[15px] h-[15px]" />
            <span className="text-[20px]">1 TON</span>
        </div>
      </div>



        {/* Card 3: Balance Booster */}
        <div className="bg-gradient-to-b from-[#e5e782] to-black p-5 rounded-2xl text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
          {/* Icon */}
          <img
            src={pic3}
            alt="Balance Booster"
            className="mx-auto w-24 sm:w-28 h-16 sm:h-20 rounded-xl"
          />

          {/* Title */}
          <h2 className="mt-5 text-[14px] sm:text-[16px] text-white font-semibold">
            Balance Booster
          </h2>

          {/* Withdrawal Access */}
          <p className="text-gray-400 flex justify-center items-center mt-1 space-x-2 text-[13px] sm:text-[15px]">
            <span className="text-[#b2b2b5]">Get more tokens</span>
          </p>

          {/* Profit */}
          {/* <p className="text-gray-400 flex justify-center items-center mt-1 space-x-2 text-[13px] sm:text-[15px]">
            <span className="text-[#b2b2b5]">Profit</span>
            <img src={tonCoin} alt="Ton Coin" className="w-[12px] sm:w-[15px] h-[12px] sm:h-[15px]" />
            <span className="text-[#b2b2b5]">20 Ton</span>
          </p> */}

          {/* Divider */}
          <div className="h-[1px] bg-[#444444] rounded-lg mt-5"></div>

          {/* Level and Coin Info */}
          <div className="flex justify-center gap-4 items-center mt-3 text-[14px] sm:text-[16px]">
            <img src={tonCoin} alt="Ton Coin" className="w-[12px] sm:w-[15px] h-[12px] sm:h-[15px]" />
            <span className="text-white font-medium">10 TON</span>
          </div>
        </div>




        {/* Card 4: Token Swap Access */}
          <div className="bg-gradient-to-b from-[#823c3f] to-black p-5 rounded-2xl text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
            {/* Icon */}
            <img
              src={pic4}
              alt="Token Swap Access"
              className="mx-auto w-24 sm:w-28 h-16 sm:h-20 rounded-xl"
            />

            {/* Title */}
            <h2 className="mt-5 text-[14px] sm:text-[16px] text-white font-semibold">
              Token Swap Access
            </h2>

            {/* Withdrawal Access */}
            <p className="text-gray-400 flex justify-center items-center mt-1 space-x-2 text-[13px] sm:text-[15px]">
              <span className="text-[#b2b2b5]">Swap tokens special</span>
            </p>

            {/* Profit */}
            {/* <p className="text-gray-400 flex justify-center items-center mt-1 space-x-2 text-[13px] sm:text-[15px]">
              <span className="text-[#b2b2b5]">Profit</span>
              <img src={tonCoin} alt="Ton Coin" className="w-[12px] sm:w-[15px] h-[12px] sm:h-[15px]" />
              <span className="text-[#b2b2b5]">5 Ton</span>
            </p> */}

            {/* Divider */}
            <div className="h-[1px] bg-[#444444] rounded-lg mt-5"></div>

            {/* Level and Coin Info */}
            <div className="flex justify-center gap-4 items-center mt-3 text-[14px] sm:text-[16px]">
              <img src={tonCoin} alt="Ton Coin" className="w-[12px] sm:w-[15px] h-[12px] sm:h-[15px]" />
              <span className="text-white font-medium">0.2 TON</span>
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
          <p className="mt-1">Activities</p>
        </button>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
          <img src={Wallet} alt="Wallet" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Wallet</p>
        </div>
        </div>
        </div>

  );
};

export default SpecialsPage;