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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
