import firebase from 'firebase';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: ''
};

export default (!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app());
