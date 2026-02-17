// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU2odOQ8iS_r4DtTNsKy8EZ96u3EFg2gc",
  authDomain: "mydashboard-a5972.firebaseapp.com",
  projectId: "mydashboard-a5972",
  storageBucket: "mydashboard-a5972.firebasestorage.app",
  messagingSenderId: "433641245474",
  appId: "1:433641245474:web:b6006fc4d2a7c359be737b",
  measurementId: "G-780EDFLM17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
