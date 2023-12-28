import React from 'react';
import { Link } from 'react-router-dom';
import "./BookList.css";
const Book = ({ id, BookImage, BookName, Author, TotalEdition, PublishYear }) => {
  const imagePath = `${BookImage}`;
  console.log(imagePath);
  return (
    <div className='book-item flex flex-column flex-sb'>
      <div className='book-item-img'>
        <img src={imagePath} alt="cover" />
      </div>
      <div className='book-item-info text-center'>
        <Link to={`/book/${id}`}>
          <div className='book-item-info-item title fw-7 fs-18'>
            <span>{BookName}</span>
          </div>
        </Link>

        <div className='book-item-info-item author fs-15'>
          <span className='text-capitalize fw-7'>Author: </span>
          <span>{Array.isArray(Author) ? Author.join(", ") : Author}</span>
        </div>

        <div className='book-item-info-item edition-count fs-15'>
          <span className='text-capitalize fw-7'>Total Editions: </span>
          <span>{TotalEdition}</span>
        </div>

        <div className='book-item-info-item publish-year fs-15'>
          <span className='text-capitalize fw-7'>First Publish Year: </span>
          <span>{PublishYear}</span>
        </div>
      </div>
    </div>
  );
};

export default Book