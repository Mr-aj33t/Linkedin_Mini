import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyCo5y9RppAIzaSyCo5y9RppAIzaSy",
  authDomain: "mini-linkedin-d66a5.firebaseapp.com",
  projectId: "mini-linkedin-d66a5",
  storageBucket: "mini-linkedin-d66a5.firebasestorage.app",
  messagingSenderId: "6165413386165",
  appId: "1:6165413386165:web:5e3bc208356a3c11d5b323",
  measurementId: "G-3LDKQX366969"
=======
  apiKey: "AIzaSyB2i4zXjoTpAY1Z1W11WgMO17Yy1u_I84U",
  authDomain: "linkedin-mini-d119d.firebaseapp.com",
  projectId: "linkedin-mini-d119d",
  storageBucket: "linkedin-mini-d119d.firebasestorage.app",
  messagingSenderId: "162690039194",
  appId: "1:162690039194:web:72a47e1a7a1bd387a18e23",
  measurementId: "G-4V06BPF9Y2"
>>>>>>> ca17066 (Initial commit)
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
