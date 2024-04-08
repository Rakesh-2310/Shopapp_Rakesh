import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBahAyzF38pX6MGsE2KBqFJ3bGy41Kn_I4",
    authDomain: "shopapprakesh.firebaseapp.com",
    projectId: "shopapprakesh",
    storageBucket: "shopapprakesh.appspot.com",
    messagingSenderId: "862784687109",
    appId: "1:862784687109:web:f0f7076b6576923498606c",
    measurementId: "G-058YRB4G51"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };