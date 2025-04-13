import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"; // Import Firestore

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
const firestore = getFirestore(app); // Initialize Firestore
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);

      // Create a reference to the user's document in Firestore
      const userDocRef = doc(firestore, 'users', user.uid);

      // Check if the document exists
      getDoc(userDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            // If document exists, check if cookiemail is already set
            const userData = docSnapshot.data();
            if (userData.cookiemail) {
              // If cookiemail exists, do not overwrite it
              console.log("cookiemail already exists:", userData.cookiemail);
              window.location.href = "/account/"; // Redirect after login
            } else {
              // If cookiemail doesn't exist, create a new one
              generateTempEmail().then(tempEmail => {
                updateUserDoc(user, tempEmail); // Update with generated cookiemail
              }).catch((error) => {
                console.error("Error generating temp email:", error);
                alert("Failed to generate temp email!");
              });
            }
          } else {
            // If the document doesn't exist, create a new one
            console.log("No user document found. Creating a new one...");
            generateTempEmail().then(tempEmail => {
              createNewUserDoc(user, tempEmail); // Create the new document with cookiemail
            }).catch((error) => {
              console.error("Error generating temp email:", error);
              alert("Failed to generate temp email!");
            });
          }
        })
        .catch((error) => {
          console.error("Error getting user document:", error);
          alert("Failed to retrieve user data!");
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during Google login:", errorMessage);
      alert(errorMessage);
    });
});

// Function to create a new user document in Firestore
function createNewUserDoc(user, tempEmail) {
  const userDocRef = doc(firestore, 'users', user.uid);
  setDoc(userDocRef, {
    username: user.displayName,
    email: user.email,
    cookiemail: tempEmail, // Save the generated temp email
    createdAt: new Date(), // Timestamp for account creation
  })
    .then(() => {
      console.log("User document created successfully!");
      window.location.href = "/account/"; // Redirect to the account page
    })
    .catch((error) => {
      console.error("Error creating user document:", error);
      alert("Failed to create user document!");
    });
}

// Function to update an existing user document with the cookiemail
function updateUserDoc(user, tempEmail) {
  const userDocRef = doc(firestore, 'users', user.uid);
  setDoc(userDocRef, {
    cookiemail: tempEmail, // Only update the cookiemail field
  }, { merge: true })
    .then(() => {
      console.log("User document updated successfully!");
      window.location.href = "/account/"; // Redirect to the account page
    })
    .catch((error) => {
      console.error("Error updating user document:", error);
      alert("Failed to update user document!");
    });
}

// Function to generate a temp email for the user
async function generateTempEmail() {
  const domain = await getValidDomain();
  const random = Math.random().toString(36).substring(2, 10); // Generate a random string
  const tempEmail = `${random}@${domain}`; // Create the temp email with the domain
  return tempEmail;
}

// Function to get a valid domain for the temp email
async function getValidDomain() {
  const res = await fetch('https://api.mail.tm/domains');
  const data = await res.json();
  return data["hydra:member"][0].domain; // Use the first available domain
}