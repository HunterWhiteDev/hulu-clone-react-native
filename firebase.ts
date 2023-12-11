import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import "firebase/firestore";
import "firebase/functions";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import keys from "./firebaseKeys";

const firebaseConfig = keys;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const functions = getFunctions(app, "us-central1");
export const login = signInWithEmailAndPassword;
export const signUp = createUserWithEmailAndPassword;
export const authChange = onAuthStateChanged;
const db = getFirestore(app);
export default db;
