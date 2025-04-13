import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAxkQA5tBqp_5fco6Y_8i2mhI15ECJeNh0",
    authDomain: "cookiemovie-27669.firebaseapp.com",
    databaseURL: "https://cookiemovie-27669-default-rtdb.firebaseio.com",
    projectId: "cookiemovie-27669",
    storageBucket: "cookiemovie-27669.firebasestorage.app",
    messagingSenderId: "845488313573",
    appId: "1:845488313573:web:e4928462b97eb4dda4300c",
    measurementId: "G-YSQ6FLGCH1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const user = auth.currentUser;
const userEmail = document.getElementById('email');

function updateUserProfile(user) {
    const username = user.displayName;
    const userEmail = user.email;
    const userProfilePicture = user.photoURL;
    console.log(userEmail)

    document.getElementById("username").textContent = username;
    document.getElementById("email").textContent = userEmail;
    document.getElementById("userProfilePicture").src = userProfilePicture;
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUserProfile(user);
        const uid = user.uid;
        return uid;
        userEmail.textContent = userData.email;

    } else {
        console.log('Create Account & login');
    }
});