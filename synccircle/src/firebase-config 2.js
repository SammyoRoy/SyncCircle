// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB5jHJQqvfpAOhqvdEEdvc0Jrerns6SfU",
  authDomain: "synccircle-test.firebaseapp.com",
  projectId: "synccircle-test",
  storageBucket: "synccircle-test.appspot.com",
  messagingSenderId: "162063538203",
  appId: "1:162063538203:web:967970053b91b6d14940be",
  measurementId: "G-M86LFNB95H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);