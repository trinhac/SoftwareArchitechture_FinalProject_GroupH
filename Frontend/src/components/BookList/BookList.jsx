// import { useGlobalContext } from '../../context.';
import Loading from "../Loader/Loader";
// import coverImg from "../../images/cover_not_found.jpg";
import { useGlobalContext } from '../../context.';
import "./BookList.css";
import Book from "../BookList/Book";
import React, { useState, useEffect } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const { searchTerm } = useGlobalContext();

  useEffect(() => {
    // Gọi hàm get từ API ở đây và cập nhật state books
    const fetchData = async () => {
      try {
        let apiUrl = 'http://localhost:8080/books';
        if (searchTerm) {
          apiUrl = `http://localhost:8080/books/name/${searchTerm}`;
        }

        const response = await fetch(apiUrl); // Thay đổi URL API thực tế của bạn
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm]); // Thêm searchTerm vào dependency array để useEffect chạy khi searchTerm thay đổi
  if (!books.length) {
    return <Loading />;
  }
  return (
    <section className='booklist'>
      <div className='container'>
        <div className='booklist-content grid'>
          {books.slice(0, 30).map((book) => (
            <Book key={book.id} {...book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookList;