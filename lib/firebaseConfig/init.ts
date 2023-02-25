// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { FIREBASE_CONFIG } from "../../config";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
function initFirebase() {
  const firebaseConfig = FIREBASE_CONFIG;

  // Initialize Firebase
  const apps = getApps();
  if (!apps.length) {
    initializeApp(firebaseConfig);
  }
}

initFirebase();
