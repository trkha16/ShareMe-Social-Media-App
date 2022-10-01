import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCnHdgTPFOZVEmQJKYBSybUJBvgIPJ-mUw",
    authDomain: "shareme2-e5c61.firebaseapp.com",
    projectId: "shareme2-e5c61",
    storageBucket: "shareme2-e5c61.appspot.com",
    messagingSenderId: "932107535165",
    appId: "1:932107535165:web:7f442f864105a213433b54",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
