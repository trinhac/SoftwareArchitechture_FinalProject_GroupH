import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './context.';
import './index.css';
import Home from './pages/Home/Home';
import About from "./pages/About/About";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import AdminBooksCRUD from './pages/Admin/Admin';
import AddBookForm from './components/AddBook/AddBook';
import LoginForm from './pages/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="about" element={<About />} />
          <Route path="book" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<AdminBooksCRUD />}>
          <Route path="/admin/addbook" element={<AddBookForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);

