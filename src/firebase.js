// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue,push } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqWLBuFqxF5Us-Qq_azgMb9c1hsJ9y0b4",
  authDomain: "plant-system-51fcb.firebaseapp.com",
  databaseURL: "https://plant-system-51fcb-default-rtdb.firebaseio.com",
  projectId: "plant-system-51fcb",
  storageBucket: "plant-system-51fcb.firebasestorage.app",
  messagingSenderId: "578326251485",
  appId: "1:578326251485:web:f249b55da50c2e5d921834",
  measurementId: "G-72WE0F752T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export { database, ref, onValue ,push};