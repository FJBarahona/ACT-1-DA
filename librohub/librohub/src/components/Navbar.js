import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/libros">Libros</Link>
      <Link to="/libros/nuevo">Agregar Libro</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Registrar</Link> 
    </nav>
  );
}

export default Navbar;
