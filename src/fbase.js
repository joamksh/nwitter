// fbase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY || '',
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || '',
  projectId: process.env.REACT_APP_PROJECT_ID || '',
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || '',
  appId: process.env.REACT_APP_APP_ID || '',
};

const firebaseApp = initializeApp(firebaseConfig);
const authService = getAuth(firebaseApp);
const dbService = getFirestore(firebaseApp);
const storageService = getStorage(firebaseApp);

export { authService, firebaseApp, dbService, storageService };
