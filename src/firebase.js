import firebase from "firebase";
import { firebaseConfig } from "./firebase-config"; 

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
