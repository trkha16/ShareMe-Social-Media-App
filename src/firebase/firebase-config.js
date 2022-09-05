import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCTEF-DxXNp1xv1SANZcOotCn9-R06lQ8E",
    authDomain: "shareme-503b7.firebaseapp.com",
    projectId: "shareme-503b7",
    storageBucket: "shareme-503b7.appspot.com",
    messagingSenderId: "104816037148",
    appId: "1:104816037148:web:a4466cbfcf747b011d3ed9",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
