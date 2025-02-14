import { useNavigate } from 'react-router-dom';
import { Activities, Discipline, binanceLogo, Earn, gojo, LuckyWin, mine, one, Wallet, MEME_COIN, } from '../../images';
import React, { useState, useEffect } from 'react';
import Settings from '../../icons/Settings';   
import { TonConnect, TonConnectButton } from '@tonconnect/ui-react';


const WalletPage: React.FC = () => {
      const navigate = useNavigate();
      const [levelIndex, setLevelIndex] = useState(6);
      const [points, setPoints] = useState(0);
      const profitPerHour = 100;
      //const pointsToAdd = 2;


      const [claimedPoints, setClaimedPoints] = useState<number>(() => {
        const savedPoints = localStorage.getItem("claimedPoints");
        return savedPoints ? parseInt(savedPoints, 10) : 0;
      });

      useEffect(() => {
        // Sync state with localStorage changes
        const savedPoints = localStorage.getItem("claimedPoints");
        const savedLevel = localStorage.getItem("level");
        if (savedPoints) setClaimedPoints(parseInt(savedPoints, 10));
      }, []);

      const [pointsToAdd, setPointsToAdd] = useState<number>(() => {
        return parseInt(localStorage.getItem("PointsToAdd") || "2", 10);
      });

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
              </div>
            </div>
          </div>
        </div>


      {/* Cards Section */}
      <div className=" flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="overflow-y-auto absolute top-[2px] left-0 right-0 bottom-0 bg-[#131313] rounded-t-[46px]">


        {/*s Card Section */}
        <div className="flex items-center justify-center w-full sm:w-1/2 border-2 border-[#43433b] rounded-full px-3 py-4 bg-[#43433b]/60 max-w-72 mx-auto mt-36">
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
            <div className="flex items-center justify-center mt-10">
              {/* TonButton */}
              <TonConnectButton/>
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

export default WalletPage;