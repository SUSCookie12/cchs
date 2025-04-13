import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
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

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const firestore = getFirestore(app);

// DOM Elements
const authButton = document.getElementById('authButton');
const emailSpan = document.getElementById('email');
const dropdownMenu = document.getElementById('dropdownMenu');
const logoutButton = document.getElementById('logoutButton');

// Check Authentication State
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is authenticated
        window.location.href = "/my-gallery/"; // Redirect to gallery page
        authButton.onclick = () => {
            // Toggle dropdown menu
            dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
        };

        // Fetch and display user email
        const userDocRef = doc(firestore, 'users', user.uid);
        getDoc(userDocRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    emailSpan.textContent = userData.email;
                } else {
                    console.log('No user data found!');
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    } else {
        // User is not authenticated
        authButton.onclick = () => {
            // Redirect to login page
            window.location.href = '/account/login';
        };
        emailSpan.textContent = 'Login'; // Show "Login" text
    }
});

// Logout functionality
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location.href = '/account/login'; // Redirect to login page
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});