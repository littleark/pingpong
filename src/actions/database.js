import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCtMIXBw70n37GC-a0vXPLMmBgGDmg69Ow",
  authDomain: "pingpong-a6023.firebaseapp.com",
  databaseURL: "https://pingpong-a6023.firebaseio.com",
  projectId: "pingpong-a6023",
  storageBucket: "pingpong-a6023.appspot.com",
  messagingSenderId: "628310472349"
}

firebase.initializeApp(config)
const database = firebase.database()

export default database
