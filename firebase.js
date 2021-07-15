import firebase from "firebase";
import "firebase/firebase-firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAQ7rMYeckZZ56Wi6LaRVMZfdCefe1hEuU",
  authDomain: "chat-guido-native.firebaseapp.com",
  projectId: "chat-guido-native",
  storageBucket: "chat-guido-native.appspot.com",
  messagingSenderId: "148812485407",
  appId: "1:148812485407:web:e49ab38015a1097637562a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let firestore = firebase.firestore();

export default firestore;
