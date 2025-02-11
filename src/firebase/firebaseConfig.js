// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  firebase,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  child,
  remove,
  push,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDb8Oi6pdP6xOnuyr5LGgeowa7BJe3dKD0",
  authDomain: "task-system-a6d72.firebaseapp.com",
  databaseURL: "https://task-system-a6d72-default-rtdb.firebaseio.com",
  projectId: "task-system-a6d72",
  storageBucket: "task-system-a6d72.firebasestorage.app",
  messagingSenderId: "527960042944",
  appId: "1:527960042944:web:2c8e45d115955be0beac25"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

export {
  app,
  auth,
  firestore,
  database,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  doc,
  setDoc,
  ref,
  set,
  getDatabase,
  onValue,
  get,
  child,
  remove,
  onAuthStateChanged,
  push,
  firebase,
};
