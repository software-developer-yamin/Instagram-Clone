import { getApp, getApps, initializeApp, } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyAhIVkBMWawoXNZasVBJvjaiBXTNckNd04",
     authDomain: "let-s-build-instagram.firebaseapp.com",
     projectId: "let-s-build-instagram",
     storageBucket: "let-s-build-instagram.appspot.com",
     messagingSenderId: "643774951683",
     appId: "1:643774951683:web:5929df0b9d422a0e937936",
     measurementId: "G-ZMB2RW2JRC"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
export default app;