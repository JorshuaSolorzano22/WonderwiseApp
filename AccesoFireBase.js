// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlqoGHYiJY5JQ73cOMJjrqX6Jvo9JMVfU",
  authDomain: "proyectogrupalmultimedios.firebaseapp.com",
  projectId: "proyectogrupalmultimedios",
  storageBucket: "proyectogrupalmultimedios.firebasestorage.app",
  messagingSenderId: "805678040727",
  appId: "1:805678040727:web:13a359f8719e4646184bd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;