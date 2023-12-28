import React, { useState } from 'react';
import axios from 'axios';

const AddBookForm = () => {
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/books/post', formData);
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
            alert('Book added successfully!');
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="BookName" className="form-label">Book Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="BookName"
                    name="BookName"
                    value={formData.BookName}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="Author" className="form-label">Author:</label>
                <input
                    type="text"
                    className="form-control"
                    id="Author"
                    name="Author"
                    value={formData.Author}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="TotalEdition" className="form-label">Total Edition:</label>
                <input
                    type="text"
                    className="form-control"
                    id="TotalEdition"
                    name="TotalEdition"
                    value={formData.TotalEdition}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="PublishYear" className="form-label">Publish Year:</label>
                <input
                    type="text"
                    className="form-control"
                    id="PublishYear"
                    name="PublishYear"
                    value={formData.PublishYear}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="subject_places" className="form-label">Subject Places:</label>
                <input
                    type="text"
                    className="form-control"
                    id="subject_places"
                    name="subject_places"
                    value={formData.subject_places}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="subject_times" className="form-label">Subject Times:</label>
                <input
                    type="text"
                    className="form-control"
                    id="subject_times"
                    name="subject_times"
                    value={formData.subject_times}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="subjects" className="form-label">Subjects:</label>
                <input
                    type="text"
                    className="form-control"
                    id="subjects"
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="BookImage" className="form-label">Book Image:</label>
                <input
                    type="text"
                    className="form-control"
                    id="BookImage"
                    name="BookImage"
                    value={formData.BookImage}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary">Add Book</button>
            </div>
        </form>
    );
};

export default AddBookForm;