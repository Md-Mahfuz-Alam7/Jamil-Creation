// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDKZGt3lFVvbI365vEKJwQFLoBHDeZvqMQ",
//   authDomain: "jc-invoice-web.firebaseapp.com",
//   projectId: "jc-invoice-web",
//   storageBucket: "jc-invoice-web.firebasestorage.app",
//   messagingSenderId: "833658822461",
//   appId: "1:833658822461:web:ddbba34ce537133fc36f54",
//   measurementId: "G-D08EP2M1KZ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const analytics = getAnalytics(app);


// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDKZGt3lFVvbI365vEKJwQFLoBHDeZvqMQ",
  authDomain: "jc-invoice-web.firebaseapp.com",
  projectId: "jc-invoice-web",
  storageBucket: "jc-invoice-web.appspot.com",
  messagingSenderId: "833658822461",
  appId: "1:833658822461:web:ddbba34ce537133fc36f54",
  measurementId: "G-D08EP2M1KZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;