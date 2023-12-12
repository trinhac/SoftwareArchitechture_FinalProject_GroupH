import React, { useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context.';
import './SearchForm.css';

const SearchForm = () => {
  const { setSearchTerm, setResultTitle } = useGlobalContext();
  const searchText = useRef('');
  const navigate = useNavigate();

  useEffect(() => searchText.current.focus(), []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện submit form

    let tempSearchTerm = searchText.current.value.trim();

    if ((tempSearchTerm.replace(/[^\w\s]/gi, '')).length === 0) {
      setSearchTerm('the lost world');
      setResultTitle('Please Enter Something ...');
    } else {
      try {
        // Gọi API để lấy dữ liệu từ server
        const response = await fetch(`http://localhost:8080/books/name/${tempSearchTerm}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Xử lý dữ liệu nhận được từ server (data)
        console.log(data);

        setSearchTerm(tempSearchTerm);
        // Chuyển hướng sau khi setSearchTerm đã được thực hiện
        navigate('/book');
      } catch (error) {
        console.error('Error fetching data from server:', error);
        // Xử lý lỗi nếu cần thiết
      }
    }
  };



  return (
    <div className='search-form'>
      <div className='container'>
        <div className='search-form-content'>
          <form className='search-form' onSubmit={handleSubmit}>
            <div className='search-form-elem flex flex-sb bg-white'>
              <input type='text' className='form-control' placeholder='The Lost World ...' ref={searchText} />
              <button type='submit' className='flex flex-c' onClick={handleSubmit}>
                <FaSearch className='text-purple' size={32} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
