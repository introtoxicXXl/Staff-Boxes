import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAcTl-Om8JyeSbew0dlgyxwBY-qu7hjREg",
  authDomain: "stuff-boxes.firebaseapp.com",
  projectId: "stuff-boxes",
  storageBucket: "stuff-boxes.appspot.com",
  messagingSenderId: "823627435526",
  appId: "1:823627435526:web:43e237565f8f5cf9407d87",
  measurementId: "G-Y61GS5RHS0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;