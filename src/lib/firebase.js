import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCbGzLyuOnH0DtneCRfr2yRKpSPN5bpr0E",
  authDomain: "cerdas-berwawasan.firebaseapp.com",
  databaseURL: "https://cerdas-berwawasan-default-rtdb.firebaseio.com",
  projectId: "cerdas-berwawasan",
  storageBucket: "cerdas-berwawasan.firebasestorage.app",
  messagingSenderId: "243880102975",
  appId: "1:243880102975:web:1d008f58a112af81b6bc8a"
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;