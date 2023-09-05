// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg86zakK63iNdNZmoSEOHX1K4poB934HA",
  authDomain: "social-media-1e305.firebaseapp.com",
  projectId: "social-media-1e305",
  storageBucket: "social-media-1e305.appspot.com",
  messagingSenderId: "328485192181",
  appId: "1:328485192181:web:dfc77d95eb02d4a64720bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()