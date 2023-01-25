// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4RAxK63ATqrS6a_f8B5Zl2rRxAFdHC6w",
    authDomain: "swashv3.firebaseapp.com",
    projectId: "swashv3",
    storageBucket: "swashv3.appspot.com",
    messagingSenderId: "990558429400",
    appId: "1:990558429400:web:8da0ac5f2ce08df109b7ad",
    storageBucket: 'gs://swashv3.appspot.com/'
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;