import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: "fast-feedback-432ca.appspot.com",
    messagingSenderId: "144703334326",
    appId: "1:144703334326:web:6cc472dc725758beb3c317",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
