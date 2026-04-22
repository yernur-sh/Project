import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Мынаны қостық
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-oJWVzpLaohF46Cc3vkUevOOL-CQT61M",
  authDomain: "kazproject-af0f4.firebaseapp.com",
  projectId: "kazproject-af0f4",
  storageBucket: "kazproject-af0f4.firebasestorage.app",
  messagingSenderId: "425675800824",
  appId: "1:425675800824:web:c8026c2e463481fc06fb0d",
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // Экспортқа дайындадық
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;