import firebase from 'firebase/app';
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';


const config = {
    apiKey: "AIzaSyCcNU9guRyx03yz6a5uyPmhcyDgrGlNfg4",
    authDomain: "phonebook-6b10c.firebaseapp.com",
    databaseURL: "https://phonebook-6b10c.firebaseio.com",
    projectId: "phonebook-6b10c",
    storageBucket: "phonebook-6b10c.appspot.com",
    messagingSenderId: "409512574651",
    appId: "1:409512574651:web:12856f04b7f0bd8b81339e"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
