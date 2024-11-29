import './ActivitiesPage.css'
import { Activities, Earn, LuckyWin, memeCoin, mine, Ref1, rightArrow, telegarmicon, usercomments, Wallet, xicon, youtubeicon } from '../images';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';



const ActivitiesPage: React.FC = () => {

  const navigate = useNavigate();

  const [claimedPoints, setClaimedPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem("claimedPoints");
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });

  const [pointsToAdd, setPointsToAdd] = useState(0);
  const [isVerified1, setIsVerified1] = useState(false);
  const [isVerified2, setIsVerified2] = useState(false);
  const [isVerified3, setIsVerified3] = useState(false);
  const [isVerified4, setIsVerified4] = useState(false);
  const [rewardMessage1, setRewardMessage1] = useState('');
  const [rewardMessage2, setRewardMessage2] = useState('');
  const [rewardMessage3, setRewardMessage3] = useState('');
  const [rewardMessage4, setRewardMessage4] = useState('');

  const rewardPoints = {
    reward1: 100,
    reward2: 200,
  };

   // Load the state from local storage or default to false
   const [isNewSubscribe1, setIsNewSubscribe1] = useState(() => {
    const saved = localStorage.getItem('isNewSubscribe1');
    return saved !== null ? JSON.parse(saved) : false;
  });
  
  const [isNewSubscribe2, setIsNewSubscribe2] = useState(() => {
    const saved = localStorage.getItem('isNewSubscribe2');
    return saved !== null ? JSON.parse(saved) : false;
  });
  
  const [isNewSubscribe3, setIsNewSubscribe3] = useState(() => {
    const saved = localStorage.getItem('isNewSubscribe3');
    return saved !== null ? JSON.parse(saved) : false;
  });
  
  const [isNewSubscribe4, setIsNewSubscribe4] = useState(() => {
    const saved = localStorage.getItem('isNewSubscribe4');
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("claimedPoints", claimedPoints.toString());
  }, [claimedPoints]);

  // Use an effect to store values in local storage whenever they change
  useEffect(() => {
    localStorage.setItem('isNewSubscribe1', JSON.stringify(isNewSubscribe1));
  }, [isNewSubscribe1]);

  useEffect(() => {
    localStorage.setItem('isNewSubscribe2', JSON.stringify(isNewSubscribe2));
  }, [isNewSubscribe2]);

  useEffect(() => {
    localStorage.setItem('isNewSubscribe3', JSON.stringify(isNewSubscribe3));
  }, [isNewSubscribe3]);

  useEffect(() => {
    localStorage.setItem('isNewSubscribe4', JSON.stringify(isNewSubscribe4));
  }, [isNewSubscribe4]);
  

  const addPoints = (rewardKey: string, setRewardMessage: React.Dispatch<React.SetStateAction<string>>) => {
    const rewardValue = rewardPoints[rewardKey];
    setClaimedPoints((prev) => prev + rewardValue);
    setPointsToAdd((prev) => prev + rewardValue);
    setRewardMessage(`🎉 Congratulations! You've earned +${rewardValue} TGB! 🎉`);
  };

  // const verifyTask = (correctCode: string, rewardKey: string, setRewardMessage: React.Dispatch<React.SetStateAction<string>>, setIsVerified: React.Dispatch<React.SetStateAction<boolean>>) => {
  //   const userCode = prompt("Enter the code you saw in the video:");
  //   if (userCode === correctCode) {
  //     addPoints(rewardKey, setRewardMessage);
  //     setIsVerified(true);
  //   } else {
  //     alert("Incorrect code. Please try again after watching the video.");
  //   }
  // };

  // const TelegramNewUser = () => {
  //   window.open("https://t.me/ThoughGoldBullGroup");
  //   setIsNewSubscribe1(true);
  // };

  // const TwitterNewUser = () => {
  //   window.open("https://x.com/though_goldbull");
  //   setIsNewSubscribe2(true);
  // };

  // const YouTubeNewUser = () => {
  //   window.open("https://www.youtube.com/@ThoughGoldBull");
  //   setIsNewSubscribe3(true);
  // };

  // const TelegramRef1 = () => {
  //   window.open("https://t.me/beeharvestbot?start=6315760113_d0oIklLk");
  //   setIsNewSubscribe4(true);
  // };

  const verifyTaskWithoutPassword = (
    rewardKey: string,
    setRewardMessage: React.Dispatch<React.SetStateAction<string>>,
    setIsVerified: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    // Directly grant the reward
    addPoints(rewardKey, setRewardMessage);
    setIsVerified(true);
  };


  return (
    <div className="min-h-screen bg-[#131313] text-white p-7">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex items-center text-lg ml-5 text-[#bfad94]">
        <div className="dot mr-1"></div>
        <img src={rightArrow} alt="right" className="w-5 h-5 right242" />
          <span className="ml-2">Daily Checkin</span>
        </div>
        <div className="flex items-center bg-[#272a2f] px-3 py-1 rounded-full">
          <img src={memeCoin} alt="dollarCoin" className="w-6 h-6 mr-2" />
          <p className="text-yellow-400">{claimedPoints}</p>
        </div>
      </div>

      {/* Tab Menu */}
      <div className="rounded-lg flex flex-row sm:flex-row justify-between mb-5 mt-16 border-solid border-1 border-[#444444]">

      <div className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm sm:left-8">
        <button>
          <img src={Activities} alt="Activities" className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 sm:left-8" />
          <p className="translate-x-2">Tasks</p>
        </button>
      </div>

      <div className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm"> 
        <button onClick={() => navigate('/VideoPage')} >
          <div className="dot232"></div>
          <img src={youtubeicon} alt="Videos" className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 sm:left-8" />
          <p className="translate-x-2">Videos</p>
        </button>
      </div>

      <div className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm">
        <button onClick={() => navigate('/RefPage')}>
          <img src={usercomments} alt="Referrals" className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 sm:left-8" />
          <p className="translate-x-2">Referrals</p>
        </button>
      </div>

      </div>

      {/* Social Tasks Section */}
      <div className='p-7'>
        <h2 className="text-[20px] mb-3">Social Tasks</h2>
        <p className="text-[16px] mb-4">Perform social tasks to earn more TGB tokens and stay updated!</p>

        {/* Task Card 1 - Telegram */}
        <div className="bg-[#272a2f] p-4 mb-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <img src={telegarmicon} alt="Telegram" className="w-8 h-8" />
            <div>
              <p className="text-sm md:text-base">Join my Telegram Channel</p>
              <p className="text-yellow-400 text-xs md:text-sm">+100</p>
            </div>
          </div>
          <div className="flex space-x-2 flex-wrap px-12">
            <button
             disabled={isNewSubscribe1} 
             onClick={() => {
              window.open("https://t.me/ThoughGoldBullGroup", "_blank");
              setIsNewSubscribe1(true);
              verifyTaskWithoutPassword("reward1", setRewardMessage1, setIsVerified1);
            }}
            className=" text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center mb-2 px-3 py-1 rounded text-xs sm:text-sm dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
              {isNewSubscribe1 ? "Completed" : "Perform"}
            </button>
            {/* <button
             disabled={isVerified1} 
             onClick={() => verifyTask("8465", "reward1", setRewardMessage1, setIsVerified1)}
            className=" text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center mb-2 px-3 py-1 rounded text-xs sm:text-sm dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
              {isVerified1 ? "Verified" : "Verify"}
            </button> */}
          </div>
        </div>

        {/* Task Card 2 - X */}
        <div className="bg-[#272a2f] p-4 mb-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <img src={xicon} alt="X" className="w-8 h-8" />
            <div>
              <p className="text-sm md:text-base">Follow Name on X</p>
              <p className="text-yellow-400 text-xs md:text-sm">+100</p>
            </div>
          </div>
          <div className="flex space-x-2 flex-wrap px-12">
          <button
             disabled={isNewSubscribe2} 
             onClick={() => {
              window.open("https://x.com/though_goldbull", "_blank");
              setIsNewSubscribe2(true);
              verifyTaskWithoutPassword("reward1", setRewardMessage2, setIsVerified2);
            }}
             className=" text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center mb-2 px-3 py-1 rounded text-xs sm:text-sm dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
              {isNewSubscribe2 ? "Completed" : "Perform"}
            </button>
            {/* <button
            disabled={isVerified2} 
            onClick={() => verifyTask("8465", "reward1", setRewardMessage2, setIsVerified2)}
            className=" text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center mb-2 px-3 py-1 rounded text-xs sm:text-sm dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
              {isVerified2 ? "Verified" : "Verify"}
            </button> */}
          </div>
        </div>

        {/* Task Card 3 - YouTube */}
        <div className="bg-[#272a2f] p-4 mb-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <img src={youtubeicon} alt="YouTube" className="w-8 h-8" />
            <div>
              <p className="text-sm md:text-base">Subscribe to YouTube channel</p>
              <p className="text-yellow-400 text-xs md:text-sm">+200</p>
            </div>
          </div>
          <div className="flex space-x-2 flex-wrap px-12">
          <button
             disabled={isNewSubscribe3} 
             onClick={() => {
              window.open("https://www.youtube.com/@ThoughGoldBull", "_blank");
              setIsNewSubscribe3(true);
              verifyTaskWithoutPassword("reward2", setRewardMessage3, setIsVerified3);
            }}
             className=" text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center mb-2 px-3 py-1 rounded text-xs sm:text-sm dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
              {isNewSubscribe3 ? "Completed" : "Perform"}
            </button>
            {/* <button
            disabled={isVerified3} 
            onClick={() => verifyTask("8465", "reward1", setRewardMessage3, setIsVerified3)}
            className=" text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center mb-2 px-3 py-1 rounded text-xs sm:text-sm dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
              {isVerified3 ? "Verified" : "Verify"}
            </button> */}
            </div>
            </div>

        {/* Task Card 4 - ref1 */}
        <div className="bg-[#272a2f] p-4 mb-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <img src={Ref1} alt="YouTube" className="w-8 h-8" />
            <div>
              <p className="text-sm md:text-base">Join BeeHavest to earn more</p>
              <p className="text-yellow-400 text-xs md:text-sm">+200</p>
            </div>
          </div>
          <div className="flex space-x-2 flex-wrap px-12">
          <button
             disabled={isNewSubscribe4} 
             onClick={() => {
              window.open("https://t.me/beeharvestbot?start=6315760113_d0oIklLk", "_blank");
              setIsNewSubscribe4(true);
              verifyTaskWithoutPassword("reward2", setRewardMessage4, setIsVerified4);
            }}
             className=" text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center mb-2 px-3 py-1 rounded text-xs sm:text-sm dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
              {isNewSubscribe4 ? "Completed" : "Perform"}
            </button>
            {/* <button
            disabled={isVerified4} 
            onClick={() => verifyTask("", "reward2", setRewardMessage4, setIsVerified4)}
            className=" text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center mb-2 px-3 py-1 rounded text-xs sm:text-sm dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
              {isVerified4 ? "Verified" : "Verify"}
            </button> */}
            </div>
            </div>

            {rewardMessage1 && (
                <div className="flex fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] items-center justify-center">
              <div className= "content ">
                <div className="bg-[#272a2f] rounded-lg max-w-52 p-10 text-center">
                    {rewardMessage1}
                    <button onClick={() => setRewardMessage1("")} className="mt-4 border-[2px] px-2 border-yellow-400 dark:hover:bg-yellow-400 rounded ">Okay</button>
                </div>
              </div>
              </div>
              )}

            {rewardMessage2 && (
                <div className="flex fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] items-center justify-center">
              <div className= "content ">
                <div className="bg-[#272a2f] rounded-lg max-w-52 p-10 text-center">
                    {rewardMessage2}
                    <button onClick={() => setRewardMessage2("")} className="mt-4 border-[2px] px-2 border-yellow-400 dark:hover:bg-yellow-400 rounded ">Okay</button>
                </div>
              </div>
              </div>
              )}

            {rewardMessage3 && (
                <div className="flex fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] items-center justify-center">
              <div className= "content ">
                <div className="bg-[#272a2f] rounded-lg max-w-52 p-10 text-center">
                    {rewardMessage3}
                    <button onClick={() => setRewardMessage3("")} className="mt-4 border-[2px] px-2 border-yellow-400 dark:hover:bg-yellow-400 rounded ">Okay</button>
                </div>
              </div>
              </div>
              )}
            {rewardMessage4 && (
                <div className="flex fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] items-center justify-center">
              <div className= "content ">
                <div className="bg-[#272a2f] rounded-lg max-w-52 p-10 text-center">
                    {rewardMessage4}
                    <button onClick={() => setRewardMessage4("")} className="mt-4 border-[2px] px-2 border-yellow-400 dark:hover:bg-yellow-400 rounded ">Okay</button>
                </div>
              </div>
              </div>
              )}
          </div>

      {/* Bottom fixed div */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
        <div className="text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl">
        <button onClick={() => navigate('/')}>
          <img src={Earn} alt="Earn" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Earn</p></button>
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
          <img src={Activities} alt="Activities" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Activities</p>
        </div>
        {/* <div className="text-center text-[#85827d] w-1/5">
          <img src={Wallet} alt="Wallet" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Wallet</p>
        </div> */}
      </div>
    </div>
  );
};

export default ActivitiesPage;