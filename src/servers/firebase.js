import { initializeApp } from "firebase/app";
import { addDoc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAssdCqGkmFHHbjTO1PM8dZPRhEL43Yswk",
  authDomain: "me-leva-next.firebaseapp.com",
  projectId: "me-leva-next",
  storageBucket: "me-leva-next.appspot.com",
  messagingSenderId: "426717645184",
  appId: "1:426717645184:web:df315b632ac90323e25965",
};
const firestore = getFirestore(initializeApp(firebaseConfig));
const storage = getStorage(initializeApp(firebaseConfig));
addDoc
export { firestore, storage };
