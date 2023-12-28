import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import Loading from "../Loader/Loader";
// import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
// import book1 from "../../images/book1.png";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const URL = "http://localhost:8080/books/id";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBooks] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi hàm get từ API ở đây và cập nhật state books
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/${id}`); // Thay đổi URL API thực tế của bạn
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
            {/* <img src={`../../images/${book?.BookImage}`} alt="cover img" /> */}
            <img src={book?.BookImage} alt="cover img" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.BookName}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Places: </span>
              <span className='text-italic'>{book?.subject_places}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Times: </span>
              <span className='text-italic'>{book?.subject_times}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default BookDetails