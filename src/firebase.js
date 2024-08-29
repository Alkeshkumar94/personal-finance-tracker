import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWPg39dgvt8ItfReII27BmbchrTFtSC94",
  authDomain: "finance-tracker-web-1c83c.firebaseapp.com",
  projectId: "finance-tracker-web-1c83c",
  storageBucket: "finance-tracker-web-1c83c.appspot.com",
  messagingSenderId: "669635804007",
  appId: "1:669635804007:web:3ad9f2186fb444f8118dc2",
  measurementId: "G-LSSDTTQJ6W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
