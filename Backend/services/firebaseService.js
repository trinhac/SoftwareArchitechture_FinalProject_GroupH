const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore/lite');

class FirebaseService {
  constructor() {
    const firebaseConfig =
    {
        apiKey: "AIzaSyA1xJ0gWOtqL1HsKbjFaMRAsivyWwHmhJ0",
        authDomain: "library-softwareengineering.firebaseapp.com",
        databaseURL: "https://library-softwareengineering-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "library-softwareengineering",
        storageBucket: "library-softwareengineering.appspot.com",
        messagingSenderId: "347751562680",
        appId: "1:347751562680:web:e517d4c5b1a25e9873634d",
        measurementId: "G-10ZHBN8ET4"
    };

    this.firebaseApp = initializeApp(firebaseConfig);
    this.firestore = getFirestore(this.firebaseApp);
  }

  static getInstance() {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  getFirestoreInstance() {
    return this.firestore;
  }
}

module.exports = FirebaseService;