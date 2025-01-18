// create and initialize your own firebase here

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD2CapCWDc7JhPH4KJzsXga2ikkbOyEzhA",
    authDomain: "blogging-app-78071.firebaseapp.com",
    projectId: "blogging-app-78071",
    storageBucket: "blogging-app-78071.firebasestorage.app",
    messagingSenderId: "159320879443",
    appId: "1:159320879443:web:e2673b4ca376013b4831a6"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
