// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf8jlLdIhKfhbeiFdSb0HwYXP3QJDIMLU",
  authDomain: "codelab-1adb1.firebaseapp.com",
  projectId: "codelab-1adb1",
  storageBucket: "codelab-1adb1.appspot.com",
  messagingSenderId: "564987035866",
  appId: "1:564987035866:web:0eba648b00f3d7c207a5e3",
  measurementId: "G-J8FB42K7FN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;