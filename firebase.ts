import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfKs974qA2vuCV-QXltbOAxeofcEnbW00",
  authDomain: "strak-tracker.firebaseapp.com",
  projectId: "strak-tracker",
  storageBucket: "strak-tracker.firebasestorage.app",
  messagingSenderId: "874010601996",
  appId: "1:874010601996:web:69cfb2011ca80eae995c29",
  measurementId: "G-WPPB95W7FG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
