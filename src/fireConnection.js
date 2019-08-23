import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyAxiD6vqmIM_QA6HXNU7tBOTrdZsWtdNms",
    authDomain: "reactapp-945b5.firebaseapp.com",
    databaseURL: "https://reactapp-945b5.firebaseio.com",
    projectId: "reactapp-945b5",
    storageBucket: "",
    messagingSenderId: "615588689768",
    appId: "1:615588689768:web:76c9956acfdf3604"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;