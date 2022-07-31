// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg26hohXxIFqxmlCF3AUp-oYvUQkAzZXA",
  authDomain: "blog-a5d2a.firebaseapp.com",
  projectId: "blog-a5d2a",
  storageBucket: "blog-a5d2a.appspot.com",
  messagingSenderId: "379485913226",
  appId: "1:379485913226:web:bee869df76e87f5667ed73",
  measurementId: "G-ZVBMPYZ5G0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const provider = new GoogleAuthProvider();

export const colRef = collection(db, "posts");
export const commentsColRef = collection(db, "comments");
