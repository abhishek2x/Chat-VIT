import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC282ZtxEwxNcLwK7Wttgvq1kxDlOjDUf0",
  authDomain: "chatvit-df0d8.firebaseapp.com",
  databaseURL: "https://chatvit-df0d8.firebaseio.com",
  projectId: "chatvit-df0d8",
  storageBucket: "chatvit-df0d8.appspot.com",
  messagingSenderId: "1079244870657",
  appId: "1:1079244870657:web:4b36dea48a3bfe567d5c00",
  measurementId: "G-TLP6TWLRL6"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}


const db = app.firestore()
const auth = firebase.auth()

export { db, auth }