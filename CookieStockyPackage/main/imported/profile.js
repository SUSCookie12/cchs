import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
const emailElem = document.getElementById('email');
const usernameElem = document.getElementById('username'); // Add this line
const logoutButton = document.getElementById('logout');

// Fetch user data
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userDocRef = doc(firestore, 'users', user.uid); // Use `firestore` instead of `db`
        getDoc(userDocRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    emailElem.textContent = userData.email; // Display email
                    usernameElem.textContent = userData.username; // Add this line to display username
                } else {
                    alert('No user data found!');
                }
            })
            .catch((error) => {
                console.error('Error getting user data:', error);
            });
    } else {
        // Redirect to login page if not authenticated
        window.location.href = '/login';
    }
});

// Logout functionality
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location.href = '/login';
        })
        .catch((error) => {
            console.error('Error signing out:', error);
            alert('An error occurred while signing you out!');
        });
});