// Import Firebase SDK scripts
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Your Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);