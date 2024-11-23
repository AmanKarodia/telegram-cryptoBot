import { Activities, Earn, LuckyWin, mine, rightArrow, Wallet, youtubeicon, usercomments, memeCoin, MEME_COIN } from '../../images';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const VideoPage: React.FC = () => {

      const navigate = useNavigate();
      const [PointstoAdd ,setPointsToAdd] = useState(0);

      const [claimedPoints, setClaimedPoints] = useState<number>(() => {
        const savedPoints = localStorage.getItem("claimedPoints");
        return savedPoints ? parseInt(savedPoints, 10) : 0;
      });
      
      const [isVerified1, setIsVerified1] = useState(false);
      const [isVerified2, setIsVerified2] = useState(false);
      const [isVerified3, setIsVerified3] = useState(false);
      const [isVideoWatched1, setIsVideoWatched1] = useState(false);
      const [isVideoWatched2, setIsVideoWatched2] = useState(false);
      const [isVideoWatched3, setIsVideoWatched3] = useState(false);
      const [rewardMessage1, setRewardMessage1] = useState('');
      const [rewardMessage2, setRewardMessage2] = useState('');
      const [rewardMessage3, setRewardMessage3] = useState('');


      useEffect(() => {
        localStorage.setItem("claimedPoints", claimedPoints.toString());
      }, [claimedPoints]);
    
      const addPoints = (rewardKey: string, setRewardMessage: React.Dispatch<React.SetStateAction<string>>) => {
        const rewardValue = rewardPoints[rewardKey];
        setClaimedPoints((prev) => prev + rewardValue);
        setPointsToAdd((prev) => prev + rewardValue);
        setRewardMessage(`🎉 Congratulations! You've earned +${rewardValue} TGB! 🎉`);
      };
      

      const rewardPoints = {
        reward1: 1000,
        reward2: 1500,
        reward3: 2000,
    };
  
      const watchVideo1 = () => {
          // Open the YouTube video in a new tab
          window.open("https://www.youtube.com/@moreaj");

          // Set video as watched
          setIsVideoWatched1(true);
      };

      const watchVideo2 = () => {
          // Open the YouTube video in a new tab
          window.open("https://youtu.be/00lxm_doFYw?si=fq_NqPKAsiCXDbAh");
  
          // Set video as watched
          setIsVideoWatched2(true);
      };

      const watchVideo3 = () => {
          // Open the YouTube video in a new tab
          window.open("https://youtu.be/00lxm_doFYw?si=fq_NqPKAsiCXDbAh");
  
          // Set video as watched
          setIsVideoWatched3(true);
      };
  
      const verifyTask = (correctCode: string, rewardKey: string, setRewardMessage: React.Dispatch<React.SetStateAction<string>>, setIsVerified: React.Dispatch<React.SetStateAction<boolean>>) => {
        const userCode = prompt("Enter the code you saw in the video:");
        if (userCode === correctCode) {
          addPoints(rewardKey, setRewardMessage);
          setIsVerified(true);
        } else {
          alert("Incorrect code. Please try again after watching the video.");
        }
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
            <img src={MEME_COIN} alt="dollarCoin" className="w-6 h-6 mr-3" />
            <p className="text-yellow-400">{claimedPoints}</p>
          </div>
        </div>
  
      {/* Tab Menu */}
      <div className="rounded-lg flex flex-row sm:flex-row justify-between mb-5 mt-16 border-solid border-1 border-[#444444]">
      <div className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm sm:left-8">
        <button onClick={() => navigate('/Activities')}>
          <img src={Activities} alt="Activities" className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 sm:left-8" />
          <p className="translate-x-2">Tasks</p>
        </button>
      </div>

      <div className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm"> 
        <button>
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
        <h2 className="text-[30px] mb-2">Watch & Earn</h2>
        <p className="text-[20px] mb-4">Watch video ads and earn high token Rewards daily!</p>

        {/* Task Card 1 - Subscribe to the channel */}
        <div className="bg-[#272a2f] p-4 mb-4 rounded-lg flex flex-col justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={youtubeicon} alt="Telegram" className="w-8 h-8" />
            <div>
              <p>Watch and Earn</p>
              <p className="text-yellow-400 text-sm">+1000</p>
            </div>
          </div>
          <div className="flex space-x-2">
          <button
            disabled={isVideoWatched1} 
            onClick={watchVideo1}
            className=" text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 px-3 py-1 rounded text-sm"
            >
            {isVideoWatched1 ? "Completed" : "Perform"}
            </button>
            <button
            disabled={isVerified1}
            onClick={() => verifyTask("2222", "reward1", setRewardMessage1, setIsVerified1)}
            className=" text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 px-3 py-1 rounded text-sm"
            >
              {isVerified1 ? "Verifed" : "Verify"}
            </button>
          </div>
        </div>

        {/* Task Card 2 - video1 */}
        <div className="bg-[#272a2f] p-4 mb-4 rounded-lg flex flex-col justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={youtubeicon} alt="X" className="w-8 h-8 mx-auto" />
            <div>
              <p>Watch To earn</p>
              <p className="text-yellow-400 text-sm">+1500</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
            disabled={isVideoWatched2} 
            onClick={watchVideo2}
            className=" text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 px-3 py-1 rounded text-sm"
            >
            {isVideoWatched2 ? "Completed" : "Perform"}
            </button>
            <button
            disabled={isVerified2}
            onClick={() => verifyTask("2222", "reward2", setRewardMessage2, setIsVerified2)}
            className=" text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 px-3 py-1 rounded text-sm"
            >
              {isVerified2 ? "Verifed" : "Verify"}
            </button>
          </div>
        </div>

        {/* Task Card 3 - video2 */}
        <div className="bg-[#272a2f] p-4 rounded-lg flex flex-col justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={youtubeicon} alt="YouTube" className="w-8 h-8" />
            <div>
              <p>Watch to earn</p>
              <p className="text-yellow-400 text-sm">+2000</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
            disabled={isVideoWatched3} 
            onClick={watchVideo3} 
            className=" text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 px-3 py-1 rounded text-sm"
            >{isVideoWatched3 ? "Completed" : "Perform"}</button>
            <button
            disabled={isVerified3} 
            onClick={() => verifyTask("2222", "reward3", setRewardMessage3, setIsVerified3)}
            className=" text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 px-3 py-1 rounded text-sm"
            >
              {isVerified3 ? "Verifed" : "Verify"}
              </button>

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

          </div>
        </div>
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
            <button onClick={() => navigate('/MinePage')}>
            <img src={mine} alt="Mine" className="w-8 h-8 mx-auto" />
            <p className="mt-1">Mine</p></button>
          </div>
          <div className="text-center text-[#85827d] w-1/5">
          <button>
            <img src={Activities} alt="Activities" className="w-8 h-8 mx-auto" />
            <p className="mt-1">Activities</p></button>
          </div>
          <div className="text-center text-[#85827d] w-1/5">
            <img src={Wallet} alt="Wallet" className="w-8 h-8 mx-auto" />
            <p className="mt-1">Wallet</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default VideoPage;