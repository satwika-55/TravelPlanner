// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAHCRouPuQli54zZHNKJ43-5qXFXI3Ebw",
  authDomain: "travel-planner-71b4c.firebaseapp.com",
  projectId: "travel-planner-71b4c",
  storageBucket: "travel-planner-71b4c.firebasestorage.app",
  messagingSenderId: "301266969371",
  appId: "1:301266969371:web:571206caeb7cc3b354a9be",
  measurementId: "G-MV274YBFP2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);