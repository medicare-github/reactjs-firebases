import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxCMkVZt5vewCnbwuHIfJTB2j4Ol4sHIM",
    authDomain: "kim-wisata-klu.firebaseapp.com",
    databaseURL: "https://kim-wisata-klu.firebaseio.com",
    projectId: "kim-wisata-klu",
    storageBucket: "kim-wisata-klu.appspot.com",
    messagingSenderId: "307127541805",
    appId: "1:307127541805:web:db025f82e4513b1ab4d8a4",
    measurementId: "G-BTYREHJTCB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //   firebase.analytics();
  
  export const database = firebase.database();
  export default firebase;