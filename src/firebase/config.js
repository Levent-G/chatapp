import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBQuVkWfUWGayBondcZWwA6Poum0PpRha0",
  authDomain: "ileri-react-redux-bae86.firebaseapp.com",
  projectId: "ileri-react-redux-bae86",
  storageBucket: "ileri-react-redux-bae86.appspot.com",
  messagingSenderId: "844529974253",
  appId: "1:844529974253:web:67bec15c9f6c07fc72c5e4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
