import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo5y9RppBVlR4FG8PkWuU6Dn9gIxuqVQg",
  authDomain: "mini-linkedin-d66a5.firebaseapp.com",
  projectId: "mini-linkedin-d66a5",
  storageBucket: "mini-linkedin-d66a5.firebasestorage.app",
  messagingSenderId: "744616541338",
  appId: "1:744616541338:web:5e3bc208356a3c11d5b323",
  measurementId: "G-QX69363LDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export { analytics };
export default app;