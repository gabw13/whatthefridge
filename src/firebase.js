// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANHXMxmRFg8Z0mr4xodfmQ1Ri7ToGj_LY",
  authDomain: "whatthefridge-40984.firebaseapp.com",
  projectId: "whatthefridge-40984",
  storageBucket: "whatthefridge-40984.appspot.com",
  messagingSenderId: "605345982146",
  appId: "1:605345982146:web:6b2d3af032725198cf7d5b",
  measurementId: "G-1W1NLYMZEK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
