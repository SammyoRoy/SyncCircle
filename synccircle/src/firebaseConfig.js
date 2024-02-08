// Import the functions you need from the SDKs you need
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useLocation } from "react-router";
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6lHUzgoLcVl9Qw1MXmfnFwVDDhgYbUFk",
  authDomain: "synccircle-ea4dd.firebaseapp.com",
  projectId: "synccircle-ea4dd",
  storageBucket: "synccircle-ea4dd.appspot.com",
  messagingSenderId: "695221716118",
  appId: "1:695221716118:web:f32e009ff64e433b022eb7",
  measurementId: "G-2E4D7XFWQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

const usePageTracking = () => {
  let location = useLocation();
  useEffect(() => {
    logEvent(analytics,'page_view', {
      page_path: location.pathname,
    });
  }, [location]);
}

export default usePageTracking;

export {analytics, provider,auth};