export const getNextResetTime = (): number => {
    const now = new Date();
    // Set the next reset time to midnight
    const nextReset = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return nextReset.getTime();
  };
  
  export const shouldResetClicks = (resetTime: number): boolean => {
    const now = Date.now();
    return now >= resetTime;
  };
  
  export const initializeResetTime = (): number => {
    const savedResetTime = localStorage.getItem("resetTime");
    if (savedResetTime) {
      return parseInt(savedResetTime, 10);
    }
  
    const nextResetTime = getNextResetTime();
    localStorage.setItem("resetTime", nextResetTime.toString());
    return nextResetTime;
  };
  