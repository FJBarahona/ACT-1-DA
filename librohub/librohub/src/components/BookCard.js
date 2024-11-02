import React from 'react';
import { Link } from 'react-router-dom';

function BookCard({ libro }) {
  return (
    <div className="book-card">
      <h3>{libro.titulo}</h3>
      <p>{libro.autor}</p>
      <Link to={`/libros/${libro.id}`}>
        <button className="button">Ver Detalles</button>
      </Link>
    </div>
  );
}

export default BookCard;
