const BookModel = require('./bookModel'); // Import the BookModel

class BookController {
  constructor() {
    this.bookModel = new BookModel(); // Create an instance of BookModel
  }

  async getBookById(req, res) {
    try {
      const bookId = req.params.id;
      const book = await this.bookModel.getBookById(bookId);
      if (book) {
        res.status(234).send(book);
        console.log(book);
      } else {
        res.status(567).send(`Cannot find book with ID ${bookId}`);
        console.log(`Cannot find book with ID ${bookId}`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getAllBooks(req, res) {
    try {
      const booksData = await this.bookModel.getAllBooks();
      res.send(booksData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getBooksByName(req, res) {
    try {
      const name = req.params.name;
      const listData = await this.bookModel.getBooksByName(name);
      res.send(listData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async createBook(req, res) {
    try {
      await this.bookModel.createBook(req.body);
      console.log(`Added Book: ${req.body.BookName} to the database`);
      res.status(201).send('OK');
    } catch (err) {
      console.error(err);
      res.status(500).send('Key fields are unspecified, or wrong format');
    }
  }

  async updateBookByName(req, res) {
    try {
      const name = req.params.name;
      await this.bookModel.updateBookByName(name, req.body);
      res.status(234).send(`Updated book with name ${name}`);
    } catch (err) {
      console.error(err);
      res.status(567).send(err.message || 'Error updating book');
    }
  }

  async deleteBookById(req, res) {
    try {
      const bookId = req.params.id;
      await this.bookModel.deleteBookById(bookId);
      res.status(234).send(`Deleted book with ID ${bookId}`);
    } catch (err) {
      console.error(err);
      res.status(567).send(err.message || 'Error deleting book');
    }
  }
}

module.exports = BookController;