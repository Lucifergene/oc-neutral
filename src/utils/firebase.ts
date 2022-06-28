import { createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

export const firebaseConfig = {
  apiKey: "AIzaSyA2VDqJZ6Xh65TowUvPvjsOzyTBCQU8Ln4",
  authDomain: "oc-neutral.firebaseapp.com",
  projectId: "oc-neutral",
  storageBucket: "oc-neutral.appspot.com",
  messagingSenderId: "592729192715",
  appId: "1:592729192715:web:3a82f8fc0f106a7e740a0e",
  measurementId: "G-KCZ02PVRSG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

export const AuthContext = createContext({
  userDataPresent: false,
  user: null,
});

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signup = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  signOut(auth);
};


