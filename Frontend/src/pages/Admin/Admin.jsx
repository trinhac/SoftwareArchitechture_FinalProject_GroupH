import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBookForm from '../../components/AddBook/AddBook'; // Import the AddBookForm component
import './Admin.css';
import logoImg from '../../img/logo.png'
const AdminBooksCRUD = ({ token }) => {
    const [books, setBooks] = useState([]);
    const [formData, setFormData] = useState({
        BookName: '',
        Author: '',
        TotalEdition: '',
        PublishYear: '',
        description: '',
        subject_places: '',
        subject_times: '',
        subjects: '',
    });
    useEffect(() => {
        if (token) {
            fetchData(token);
        }
    }, [token]);

    const fetchData = async (token) => {
        const res = await axios.get('http://localhost:8080/books', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        console.log(res.data);
    };
    const [showAddForm, setShowAddForm] = useState(false); // State to manage form visibility

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addBook = async () => {
        try {
            await axios.post('http://localhost:8080/books/post', formData);
            fetchBooks();
            resetFormData();
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const resetFormData = () => {
        setFormData({
            BookName: '',
            Author: '',
            TotalEdition: '',
            PublishYear: '',
            description: '',
            subject_places: '',
            subject_times: '',
            subjects: '',
        });
    };

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    const handleDeleteBook = async (bookId) => {
        try {
            await axios.delete(`http://localhost:8080/delete/${bookId}`);
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className="admin-container">
            {/* Show or hide AddBookForm based on showAddForm state */}
            <div className="admin-nav">
                <header className="admin-header">
                    <img src={logoImg} height="100px" width="200px" alt="site logo" />

                </header>
            </div>
            {showAddForm && (
                <div className="add-book">
                    <AddBookForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        addBook={addBook}
                    />
                </div>
            )}

            {/* Toggle button for showing/hiding the form */}
            <button className="add-book-button" onClick={toggleAddForm}>
                {showAddForm ? 'Hide Form' : 'Add Book'}
            </button>

            <div className="book-list">
                <h2>Book List</h2>
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            {book.BookName} by {book.Author}
                            <button onClick={() => handleDeleteBook(book.id)}>
                                Delete
                            </button>
                            {/* Implement Update functionality similarly */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminBooksCRUD;