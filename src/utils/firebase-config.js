// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "naz-ott.firebaseapp.com",
  projectId: "naz-ott",
  storageBucket: "naz-ott.appspot.com",
  messagingSenderId: "573681011082",
  appId: "1:573681011082:web:f50176ab6fa4e54361e073",
  measurementId: "G-SX31GNN63W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
