// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN3ItcUbNwvwNTUrhDNyVfdOnwbu1hU9o",
  authDomain: "ria-busana.firebaseapp.com",
  projectId: "ria-busana",
  storageBucket: "ria-busana.appspot.com",
  messagingSenderId: "1053993262752",
  appId: "1:1053993262752:web:e0f64d268e25eff00133c5",
};

// Initialize Firebase
export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
