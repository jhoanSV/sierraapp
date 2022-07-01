import firebase from "firebase/compat/app";

const firebaseConfig = {
    apiKey: "AIzaSyBaKo2txIUTXZ2UvfV-QQQtTwpc9SnTTLc",
    authDomain: "atomicapp-502d4.firebaseapp.com",
    projectId: "atomicapp-502d4",
    storageBucket: "atomicapp-502d4.appspot.com",
    messagingSenderId: "290606760389",
    appId: "1:290606760389:web:b8e7529280846161aecbac"
  };

  //const app = initializeApp(firebaseConfig);
  export default firebase.initializeApp(firebaseConfig);