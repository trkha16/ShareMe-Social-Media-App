import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAuSwf341zlC-OVqrXeakItD_76-p9414",
  authDomain: "sharemeapp-cc2eb.firebaseapp.com",
  projectId: "sharemeapp-cc2eb",
  storageBucket: "sharemeapp-cc2eb.appspot.com",
  messagingSenderId: "600839897975",
  appId: "1:600839897975:web:c0033a668eb12d1fd41772",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
