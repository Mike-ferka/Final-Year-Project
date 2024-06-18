// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCpapiQ_HW9FKrM_XbUEIb7c3xgCpH4XME",
    authDomain: "final-year-project-96522.firebaseapp.com",
    databaseURL: "https://final-year-project-96522-default-rtdb.firebaseio.com",
    projectId: "final-year-project-96522",
    storageBucket: "final-year-project-96522.appspot.com",
    messagingSenderId: "142087385342",
    appId: "1:142087385342:web:f92efc55ea82365a77f5af",
    measurementId: "G-PRQHB8FV8H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
