import { Activities, youtubeicon, usercomments, Earn, Wallet, LuckyWin, mine, rightArrow, copy, share, memeCoin, MEME_COIN } from '../../images';
import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';



const RefPage: React.FC = () => {

  const navigate = useNavigate();
  const [points] = useState(0);
  const [copied, setCopied] = useState(false);
  const [rewardMessage, setRewardMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);


   // Social media links for sharing the app
   const socialMediaLinks = [
    {
      name: "Facebook",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 8H7V11H9V21H12V11H15L16 8H12V6.5C12 5.67 12 5 13.5 5H16V2H13.5C11 2 9 3.34 9 6V8Z" fill="#1877F2" />
        </svg>
      ),
      link: `https://www.facebook.com/sharer/sharer.php?u=https://yourapp.com`
    },
    {
      name: "Twitter",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.46 6.03C21.69 6.35 20.86 6.57 20 6.68C20.88 6.16 21.55 5.32 21.88 4.32C21.06 4.78 20.15 5.12 19.18 5.33C18.41 4.5 17.27 4 16 4C13.79 4 12 5.79 12 8C12 8.31 12.03 8.61 12.09 8.89C8.51 8.7 5.37 7.1 3.16 4.68C2.8 5.3 2.58 6.01 2.58 6.76C2.58 8.26 3.42 9.55 4.66 10.14C3.95 10.12 3.27 9.94 2.68 9.63V9.68C2.68 11.77 4.1 13.5 6 13.91C5.58 14.03 5.13 14.08 4.67 14.08C4.34 14.08 4.02 14.05 3.71 13.98C4.35 15.66 5.92 16.83 7.8 16.87C6.31 17.92 4.49 18.54 2.5 18.54C2.17 18.54 1.84 18.52 1.5 18.47C3.39 19.62 5.68 20.26 8.13 20.26C16 20.26 20 13.52 20 8.29C20 8.14 20 7.98 20 7.83C20.86 7.26 21.6 6.55 22.18 5.73L22.46 6.03Z" fill="#1DA1F2" />
        </svg>
      ),
      link: `https://twitter.com/intent/tweet?url=https://yourapp.com&text=Check%20out%20this%20app!`
    },
    {
      name: "Instagram",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 2H17C20.31 2 23 4.69 23 8V16C23 19.31 20.31 22 17 22H7C3.69 22 1 19.31 1 16V8C1 4.69 3.69 2 7 2ZM17 4H7C4.79 4 3 5.79 3 8V16C3 18.21 4.79 20 7 20H17C19.21 20 21 18.21 21 16V8C21 5.79 19.21 4 17 4ZM12 7C15.31 7 18 9.69 18 13C18 16.31 15.31 19 12 19C8.69 19 6 16.31 6 13C6 9.69 8.69 7 12 7ZM12 9C9.79 9 8 10.79 8 13C8 15.21 9.79 17 12 17C14.21 17 16 15.21 16 13C16 10.79 14.21 9 12 9ZM18.5 5.5C19.33 5.5 20 6.17 20 7C20 7.83 19.33 8.5 18.5 8.5C17.67 8.5 17 7.83 17 7C17 6.17 17.67 5.5 18.5 5.5Z" fill="#E4405F" />
        </svg>
      ),
      link: `https://instagram.com/share?url=https://yourapp.com`
    },
    {
      name: "LinkedIn",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.98 3.5C4.98 4.33 4.31 5 3.48 5C2.64 5 1.98 4.33 1.98 3.5C1.98 2.67 2.64 2 3.48 2C4.31 2 4.98 2.67 4.98 3.5ZM5 8H2V21H5V8ZM22 21H19V14.5C19 12.57 17.43 11 15.5 11C13.57 11 12 12.57 12 14.5V21H9V8H12V9.74C12.81 8.67 14.15 8 15.62 8C18.55 8 21 10.45 21 13.38V21Z" fill="#0077B5" />
        </svg>
      ),
      link: `https://www.linkedin.com/shareArticle?mini=true&url=https://yourapp.com&title=Check%20out%20this%20app!`
    }
  ];

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);



   // Unique referral link (could be dynamically generated based on user ID)
   const referralLink = "https://yourapp.com/game?ref=uniqueUserID123"; // Replace with dynamic ID if needed
  
   // Function to handle referral link copy
   const copyLink = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
      })
      .catch((err) => console.error("Could not copy link", err));
    };

    const claimReward = () => {
      setRewardMessage("🎉 You claimed your reward! 🎉");
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
            <p className="text-yellow-400">{points.toLocaleString()}</p>
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
            onClick={copyLink}
            className="flex items-center justify-center w-1/2 py-5 text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
            <img src={copy} alt="copy" className="w-5 h-5 mr-2" />
            {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>

          {/* Stats Section */}
          <div className="flex justify-between items-center mt-4">
            <div className="bg-[#43433b] text-center p-4 rounded-lg w-1/2 mr-2">
              <p className="text-lg font-bold">0 OWENS</p>
              <p className="text-xs text-gray-400">
                More friends, better rewards
              </p>
            </div>
            <div className="bg-[#43433b] text-center p-4 rounded-lg w-1/2">
              <p className="text-lg font-bold">0 TGB</p>
              <p className="text-xs text-gray-400">
                10% of your friends earnings
              </p>
            </div>
          </div>

          {/* Frens List and Claim Button */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm font-bold">friends list</p>
            <button
            onClick={claimReward} 
            className="py-3 px-3 text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
              Claim rewards
            </button>
          </div>
        </div>
        {rewardMessage && (
                <div className="flex fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] items-center justify-center">
              <div className= "content ">
                <div className="bg-[#272a2f] rounded-2xl max-w-52 p-10 text-center">
                    {rewardMessage}
                    <button onClick={() => setRewardMessage("")} className="mt-4 border-[2px] px-2 border-yellow-400 dark:hover:bg-yellow-400 rounded ">Okay</button>
                </div>
              </div>
              </div>
        )}

{isPopupOpen && (
        <div className="flex fixed flex-col top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] items-center justify-center z-50">
          <div className="bg-[#272a2f] rounded-2xl max-w-sm sm:w-[80%] md:w-[50%] p-10 sm:p-8 ">
          {socialMediaLinks.length > 0 ? (
            socialMediaLinks.map((platform) => (
              <a 
                key={platform.name} 
                href={platform.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-white no-underline mb-4 hover:text-yellow-400 transition"
                >
                {platform.icon}
                <span>{platform.name}</span>
              </a>
            ))
          ):(
            <p className="text-white text-center">No social media links available</p>
            )}
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


        {/* No Frens Message */}
        <div className="mt-4 text-center text-sm text-gray-400">
          <p>You have no friends 🤷</p>
          <p>
            Refer your friends and family, get 10% of their earnings & unlock more
            rewards!
          </p>
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
            <button onClick={() => navigate('/MinePage')}>
            <img src={mine} alt="Mine" className="w-8 h-8 mx-auto" />
            <p className="mt-1">Mine</p></button>
          </div>
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