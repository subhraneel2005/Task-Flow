import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzWydIiww8B1Gt1J8d36GWyfXQMELJ8ck",
  authDomain: "task-flow-d30cd.firebaseapp.com",
  projectId: "task-flow-d30cd",
  storageBucket: "task-flow-d30cd.appspot.com",
  messagingSenderId: "1029482371817",
  appId: "1:1029482371817:web:cbce067ab55e371e50ee78"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);