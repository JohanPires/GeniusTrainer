// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZRCxzkScMoiWLjyfJLEH30Uuo3RfSygI",
  authDomain: "geniustrainer.firebaseapp.com",
  projectId: "geniustrainer",
  storageBucket: "geniustrainer.appspot.com",
  messagingSenderId: "918882369879",
  appId: "1:918882369879:web:a32dcdf89c940734c5fe12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
