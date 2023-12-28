const { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, startAt, endAt } = require('firebase/firestore/lite');
const FirebaseService = require('./firebaseService'); // Import the Firebase Service

class BookModel {
  constructor() {
    this.firebaseService = FirebaseService.getInstance(); // Access the Firebase instance
    this.firestore = this.firebaseService.getFirestoreInstance();
    this.bookCollection = collection(this.firestore, 'Books');
  }

  async getBookById(id) {
    try {
      const result = await getDoc(doc(this.bookCollection, id));
      return result.exists() ? result.data() : null;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to fetch book with ID ${id}`);
    }
  }

  async getAllBooks() {
    try {
      const result = await getDocs(this.bookCollection);
      const booksData = [];
      result.forEach((document) => {
        booksData.push({ id: document.id, ...document.data() });
      });
      return booksData;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch all books');
    }
  }

  async getBooksByName(name) {
    try {
      const result = await getDocs(query(this.bookCollection, orderBy('BookName', 'asc'), startAt(name), endAt(name + '\uf8ff')));
      const listData = [];
      result.forEach((document) => {
        listData.push(document.data());
      });
      return listData;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to fetch books with name ${name}`);
    }
  }

  async createBook(bookData) {
    try {
      await addDoc(this.bookCollection, bookData);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to create a book');
    }
  }

  async updateBookByName(name, updatedData) {
    try {
      const querySnapshot = await getDocs(query(this.bookCollection, where('BookName', '==', name)));
      const document = querySnapshot.docs[0];
      await updateDoc(doc(this.bookCollection, document.id), updatedData);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update the book');
    }
  }

  async deleteBookById(id) {
    try {
      await deleteDoc(doc(this.bookCollection, id));
    } catch (err) {
      console.error(err);
      throw new Error('Failed to delete the book');
    }
  }
}

module.exports = BookModel;