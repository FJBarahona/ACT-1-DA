// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';         
import Home from './pages/Home';                
import BookList from './components/BookList';    
import BookDetail from './pages/BookDetail';    
import Cart from './pages/Cart';                   
import Login from './pages/Login';         
import BookForm from './components/BookForm';  
import Register from './pages/Register'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/libros" element={<BookList />} />
        <Route path="/libros/nuevo" element={<BookForm />} /> 
        <Route path="/libros/:id" element={<BookDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
      </Routes>
    </Router>
  );
}

export default App;
