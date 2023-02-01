// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJTD9VVQ9FLdhHMW5obErVnV7JhHN3QLg",
    authDomain: "to-do-app-a2cd9.firebaseapp.com",
    projectId: "to-do-app-a2cd9",
    storageBucket: "to-do-app-a2cd9.appspot.com",
    messagingSenderId: "971638295684",
    appId: "1:971638295684:web:4503d84fbf9a9280b006d1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export const auth = getAuth(app)

export default db;

