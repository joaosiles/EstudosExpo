import * as firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import '@firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCcBwfzdzF_oHLW44E4uTvr6T4FkpdXbCI",
    authDomain: "meuprojeto-e4409.firebaseapp.com",
    projectId: "meuprojeto-e4409",
    storageBucket: "meuprojeto-e4409.appspot.com",
    messagingSenderId: "801833049160",
    appId: "1:801833049160:web:e2b8cdb976032d15830c7d"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebaseConfig };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
