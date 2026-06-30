import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCtOwBD2U0Civno3l9geFT6lysO3vh5YaU",                  
  authDomain: "devsync-ai-1d264.firebaseapp.com",
  projectId: "devsync-ai-1d264",
  storageBucket: "devsync-ai-1d264.firebasestorage.app",
  messagingSenderId: "456735842951",
  appId: "1:456735842951:web:a8f6db1fe814f2aa064e22",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;