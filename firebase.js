// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAX9lNYwkOqkIn0LQp-y3j2vW66M1c9m_4",
  authDomain: "imaroro-ward-residents-f-fdb79.firebaseapp.com",
  databaseURL: "https://imaroro-ward-residents-f-fdb79-default-rtdb.firebaseio.com",
  projectId: "imaroro-ward-residents-f-fdb79",
  storageBucket: "imaroro-ward-residents-f-fdb79.appspot.com",
  messagingSenderId: "727105971088",
  appId: "1:727105971088:web:953e964d8c05ba93b38915",
  measurementId: "G-VM5E905VHB"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, ref, push, onValue, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
