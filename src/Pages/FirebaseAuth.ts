// FirebaseAuth.js
import { useEffect, useState } from 'react';
import { auth } from './firebase'; // Ensure correct import of your auth configuration
import { signInAnonymously, UserCredential, User } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null); // Explicitly type user as User or null

  useEffect(() => {
    const signIn = async () => {
      try {
        const userCredential: UserCredential = await signInAnonymously(auth);
        setUser(userCredential.user); // Set the user from the result
      } catch (error) {
        console.error("Error signing in anonymously:", error);
      }
    };

    // Run signIn on component mount
    signIn();

    // Optionally, you can return a cleanup function to handle any side effects when the component unmounts
    return () => {
      // Cleanup (optional for sign-out or other cleanups)
    };
  }, []); // Empty dependency array means it runs once when the component mounts

  return user;
};

export default useAuth;
