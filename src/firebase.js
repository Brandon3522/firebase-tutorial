// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5iFLmdnTZcc-bQCBxrY1ZDz8tD7_LN74",
  authDomain: "fir-tutorial-7ef2f.firebaseapp.com",
  projectId: "fir-tutorial-7ef2f",
  storageBucket: "fir-tutorial-7ef2f.appspot.com",
  messagingSenderId: "835654381523",
  appId: "1:835654381523:web:445d3fbbf73ec31c3e4926",
  measurementId: "G-KXEC0RNNXC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getFirestore(app);
