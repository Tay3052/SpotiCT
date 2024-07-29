// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnOFS3hhF5qRudUt7qGDp-jYgLBLjuFbU",
  authDomain: "spotict-6d1c3.firebaseapp.com",
  projectId: "spotict-6d1c3",
  storageBucket: "spotict-6d1c3.appspot.com",
  messagingSenderId: "913159017287",
  appId: "1:913159017287:web:e087e64e08e471a47cf262",
  measurementId: "G-QXBKVHXW0K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// 認証用のオブジェクトを作成
export const auth = getAuth(app);
// DB用のオブジェクトを作成
export const db = getFirestore(app);
