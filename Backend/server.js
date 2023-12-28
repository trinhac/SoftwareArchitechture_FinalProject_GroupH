const express = require('express');
const cors = require('cors');
const FirebaseService = require('./services/firebaseService'); // Import the Firebase Service

const server = express();
server.use(cors());
server.use(express.json());

const firebaseService = FirebaseService.getInstance(); // Access the Firebase instance

// Now you can use firebaseService.getFirestoreInstance() to interact with Firestore in your routes and controllers

// Example route:
server.get('/books', async (req, res) => {
  const firestore = firebaseService.getFirestoreInstance();
  // Use firestore to perform Firestore operations
  // Example: const result = await getDocs(collection(firestore, 'Books'));
  // Send response back
});

// Other routes and functionalities

server.listen(8080, () => {
  console.log('Server is online');
});