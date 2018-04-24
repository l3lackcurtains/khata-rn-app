import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBxqJw-nOKP8KsCWFk4nZqsQQuEZGpx5fs',
  authDomain: 'khataapp-92a39.firebaseapp.com',
  databaseURL: 'https://khataapp-92a39.firebaseio.com/',
  storageBucket: 'gs://khataapp-92a39.appspot.com/'
};

export default (!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app());
