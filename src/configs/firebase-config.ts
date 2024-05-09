// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy4HuzSdjZAjHfqs--i3QiALH4UBBMusE",
  authDomain: "blog-tech-420602.firebaseapp.com",
  projectId: "blog-tech-420602",
  storageBucket: "blog-tech-420602.appspot.com",
  messagingSenderId: "824799017032",
  appId: "1:824799017032:web:47eeb63a6ee04599be407d",
  measurementId: "G-0XJ29CCF0K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
