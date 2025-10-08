// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpZpP3hM70XK51OEBRR_iaGByhSRujvDo",
  authDomain: "zoolirante-4c01d.firebaseapp.com",
  projectId: "zoolirante-4c01d",
  storageBucket: "zoolirante-4c01d.firebasestorage.app",
  messagingSenderId: "117339403866",
  appId: "1:117339403866:web:5dacbf03911cb91338ca63",
  measurementId: "G-19CLCPSBBC"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)

export {app, auth}