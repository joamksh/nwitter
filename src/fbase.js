// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 수정된 부분: auth 모듈을 가져오는 방식 변경

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY || "",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || "",
  projectId: process.env.REACT_APP_PROJECT_ID || "",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || "",
  appId: process.env.REACT_APP_APP_ID || "",
};

const firebaseApp = initializeApp(firebaseConfig);

// 수정된 부분: getAuth 메서드를 사용하여 auth 서비스를 가져옴
export const authService = getAuth(firebaseApp);

