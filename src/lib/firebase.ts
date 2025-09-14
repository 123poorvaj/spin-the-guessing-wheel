import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBptFjtMcm5WP2zhzaaUCFFVtRaTX_fiZ0",
  authDomain: "exam-90db9.firebaseapp.com",
  projectId: "exam-90db9",
  storageBucket: "exam-90db9.firebasestorage.app",
  messagingSenderId: "81487645514",
  appId: "1:81487645514:web:5869d3cf23ac9846fc0fb3",
  measurementId: "G-NRT0P6JJS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;