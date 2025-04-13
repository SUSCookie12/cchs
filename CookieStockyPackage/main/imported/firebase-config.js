// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxkQA5tBqp_5fco6Y_8i2mhI15ECJeNh0",
    authDomain: "cookiemovie-27669.firebaseapp.com",
    projectId: "cookiemovie-27669",
    storageBucket: "cookiemovie-27669.firebasestorage.app",
    messagingSenderId: "845488313573",
    appId: "1:845488313573:web:e4928462b97eb4dda4300c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // Authentication
const firestore = getFirestore(app); // Firestore

// Export Firebase services
export { auth, firestore };