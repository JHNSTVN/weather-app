// Import the necessary functions from the Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// This configuration object contains all the necessary keys and identifiers to connect my application to Firebase services.
// It's crucial to keep these keys secure, especially the apiKey, as they grant access to my Firebase project.
const firebaseMagic = {
    apiKey: "AIzaSyA8uQQ8cvdgff9kb0o1x4W6ULjotV2P4KU", // API key for authenticating requests to Firebase
    authDomain: "weather-app-f49c5.firebaseapp.com", // Domain under which the app is hosted
    projectId: "weather-app-f49c5", // Unique identifier for the Firebase project
    storageBucket: "weather-app-f49c5.appspot.com", // Firebase storage bucket URL
    messagingSenderId: "188477160396", // Unique ID for Firebase messaging
    appId: "1:188477160396:web:6eda0d11193a61690abb69", // Unique identifier for the Firebase app
    measurementId: "G-5TH30WRMC9" // Measurement ID used by Firebase Analytics (optional)
};

// Initialize Firebase
// The initializeApp function sets up the Firebase application using the provided configuration.
// This is a necessary step before I can use any Firebase services in the app.
const app = initializeApp(firebaseMagic);

// Initialize Firestore
// Firestore is a flexible, scalable database for mobile, web, and server development.
// In this application, I’m using Firestore to store and retrieve user data, weather data, or other necessary information.
const dbWizards = getFirestore(app);

// Initialize Firebase Analytics
// Firebase Analytics helps track user interactions within the app, providing insights into user behavior and app performance.
const analytics = getAnalytics(app);

// Export the Firestore instance
// By exporting dbWizards, I make it accessible to other parts of the application where database interactions are needed.
export { dbWizards };

/*
Talking Points:
- This file sets up Firebase for the Weather Wizard application, allowing it to interact with various Firebase services like Firestore and Analytics.
- I chose Firestore as the database solution for its scalability and ease of use with Firebase.
- Firebase Analytics can provide valuable data on how users interact with the app, which will be useful for future enhancements or improving user experience.
- It’s important to keep the Firebase configuration secure, as it contains sensitive information like the API key.
- This setup ensures that my app is ready to use Firebase services whenever needed, by initializing them here.
*/

