// @ts-nocheck
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEJmisfPOAr6aJajBM4CxauNElDECz0PA",
  authDomain: "fithub-6c0c9.firebaseapp.com",
  projectId: "fithub-6c0c9",
  storageBucket: "fithub-6c0c9.appspot.com",
  messagingSenderId: "233714024204",
  appId: "1:233714024204:web:68c807debde5ea963f1329",
  measurementId: "G-6Y8MXN9TY8"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
