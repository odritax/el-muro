import firebase from 'firebase/app';
import 'firebase/firestore'
// referencing configuration values from .env.development
var firebaseConfig = {
    apiKey: "AIzaSyDJk1jypU5XJPL9D9kMlk4uwybGYB2Gmfg",
    authDomain: "elmuro-178de",
    databaseURL: "https://your-project's-unique-id.firebaseio.com",
    projectId:"elmuro-178de",
    storageBucket: "elmuro-178de.appspot.com" ,
    messagingSenderId:"G-YTFHF8109D",
    appId: "1:1086984660466:web:26b5c59ba3cb2bcfe4b76b",
};

// Initialize Firebase with configurations from above
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
