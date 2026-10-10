import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";



const firebaseConfig = {
  apiKey: "AIzaSyAW-W8YTifEGtVc1-Dq0mk9XCWXRimlmns",
  authDomain: "swachhcoin-2be4a.firebaseapp.com",
  projectId: "swachhcoin-2be4a",
  storageBucket: "swachhcoin-2be4a.firebasestorage.app",
  messagingSenderId: "271418611177",
  appId: "1:271418611177:web:ed96691a8d7b755cc86778",
  measurementId: "G-6YS3W24P5F"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);