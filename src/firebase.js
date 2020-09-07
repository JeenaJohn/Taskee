import firebase from 'firebase';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDiHSOdiX9sfdFx9T5GIGO7SwqbzDTddks",
    authDomain: "trackerjj-6da7f.firebaseapp.com",
    databaseURL: "https://trackerjj-6da7f.firebaseio.com",
    projectId: "trackerjj-6da7f",
    storageBucket: "trackerjj-6da7f.appspot.com",
    messagingSenderId: "45979581551",
    appId: "1:45979581551:web:bfe4923278441f450fa19a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;