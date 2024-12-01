import { Activities, Earn, LuckyWin, memeCoin, mine, rightArrow, telegarmicon, usercomments, Wallet, xicon, youtubeicon } from '../images';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';



const ActivitiesPage: React.FC = () => {

  const navigate = useNavigate();
  const [claimedPoints, setClaimedPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem("claimedPoints");
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [code, setCode] = useState(""); // State to store the code
  const [message, setMessage] = useState(""); // Feedback message

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCode(""); // Reset the code input
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleRedeem = () => {
    let points = 0;

    // Example redemption logic
    if (code.trim() === "SPECIAL123") {
      points = 2000; // Points awarded for the valid code
      setMessage(`Code successfully redeemed! You earned ${points} points.`);
    } else {
      setMessage("Invalid code. Please try again.");
    }

    // Update claimed points if valid code
    if (points > 0) {
      const newClaimedPoints = claimedPoints + points;
      setClaimedPoints(newClaimedPoints);
      localStorage.setItem("claimedPoints", newClaimedPoints.toString());
    }

    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-[#131313] text-white p-7">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex items-center text-lg ml-5 text-[#bfad94]">
        <div className="dot"></div>
        <img src={rightArrow} alt="right" className="w-5 h-5 right242" />
          <span className="ml-">Setting Menu</span>
        </div>
        <div className="flex items-center bg-[#272a2f] px-3 py-1 rounded-full">
          <img src={memeCoin} alt="dollarCoin" className="w-6 h-6 mr-2" />
          <p className="text-yellow-400">{claimedPoints}</p>
        </div>
      </div>

      {/* Tab Menu */}
      <div className="rounded-lg flex flex-row sm:flex-row justify-between mb-5 mt-16 border-solid border-1 border-[#444444]">
      <div className="border-solid border-2 border-[#444444] rounded-lg flex-1 py-2 text-center hover:bg-transparent active:bg-gray-500 focus:outline-none text-white relative sm:py-4 sm:text-base text-sm sm:left-8">
          <p>Setting</p>
      </div>
    </div>

      {/* Social Tasks Section */}
      <div className='p-7'>
        {/* Task Card 1 - Telegram */}
        <div className="bg-[#272a2f] p-4 mb-4 rounded-lg flex flex-col sm:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row items-center sm:items-start w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0">
                <input
                placeholder="Enter Code here"
                value={code}
                type="text"
                onChange={handleCodeChange}
                className="w-full sm:w-auto text-sm md:text-base border-2 rounded-2xl border-solid border-[#444444] bg-zinc-800 text-center px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-2 px-4 sm:px-0">
                <button
                onClick={handleRedeem}
                className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-center px-4 py-2 rounded text-xs sm:text-sm dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                >
                Redeem Code
                </button>
                {message && (
                <p className="w-full sm:w-auto text-center mt-2 text-sm text-yellow-400">
                    {message}
                </p>
                )}
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
          <img src={Activities} alt="Activities" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Activities</p>
        </div>
        {/* <div className="text-center text-[#85827d] w-1/5">
          <img src={Wallet} alt="Wallet" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Wallet</p>
        </div> */}
      </div>
    </div>
    </div>
  );
};

export default ActivitiesPage;