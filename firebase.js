// ============================================================
// FIREBASE — Configuration & Initialization
// ============================================================

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAs4b32nlojZC268FH0hu8ffbcEHyAEQfg",
  authDomain: "weekendjeweg-a6eb5.firebaseapp.com",
  projectId: "weekendjeweg-a6eb5",
  storageBucket: "weekendjeweg-a6eb5.firebasestorage.app",
  messagingSenderId: "1056796757826",
  appId: "1:1056796757826:web:8cbce7bbfc60517aef42db"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
