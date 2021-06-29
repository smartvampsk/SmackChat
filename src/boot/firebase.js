import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDUTX3Zj3T4k_sKeC4qahG_HBianDKWKOQ',
  authDomain: 'smackchat-71c28.firebaseapp.com',
  projectId: 'smackchat-71c28',
  storageBucket: 'smackchat-71c28.appspot.com',
  messagingSenderId: '254354520559',
  appId: '1:254354520559:web:1d410ae096fb68b8439e1a'
}

// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()
export { firebaseAuth, firebaseDb }
