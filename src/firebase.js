const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyDU2odOQ8iS_r4DtTNsKy8EZ96u3EFg2gc",
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    "mydashboard-a5972.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "mydashboard-a5972",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    "mydashboard-a5972.firebasestorage.app",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "433641245474",
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID ||
    "1:433641245474:web:b6006fc4d2a7c359be737b",
  measurementId:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-780EDFLM17",
};

const firebaseDatabaseUrl =
  process.env.REACT_APP_FIREBASE_DB_URL ||
  `https://${firebaseConfig.projectId}-default-rtdb.firebaseio.com`;

const firebaseToken = process.env.REACT_APP_FIREBASE_DB_TOKEN || "";

export { firebaseConfig, firebaseDatabaseUrl, firebaseToken };
