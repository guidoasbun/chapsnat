import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";

// Your web app's Firebase configuration, which you copy-pasted from Step 6
const firebaseConfig = {
  apiKey: "AIzaSyC7CQwBSzjC_tlEiMd2Mc8Sh9Fb_Cwc1p8",
  authDomain: "chapsnat-3f4f7.firebaseapp.com",
  projectId: "chapsnat-3f4f7",
  storageBucket: "chapsnat-3f4f7.appspot.com",
  messagingSenderId: "239440555368",
  appId: "1:239440555368:web:d7d431a3733e778d273add",
  measurementId: "G-W4Y70B8JL2",
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
let firestore = firebase.firestore();

export default firestore;
