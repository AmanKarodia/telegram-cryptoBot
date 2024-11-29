// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration (replace with your own)
const firebaseConfig = {
    apiKey: "AIzaSyBm7Bt8ilQppw3W9H3Q4NZ7xoWVpLAzlgg",
    authDomain: "thoughgoldbull.firebaseapp.com",
    projectId: "thoughgoldbull",
    storageBucket: "thoughgoldbull.firebasestorage.app",
    messagingSenderId: "1077682333802",
    appId: "1:1077682333802:web:9deb87646e8e3a58e88213",
    measurementId: "G-2TLRS31HTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
