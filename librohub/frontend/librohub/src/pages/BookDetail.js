import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookDetail() {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const response = await axios.get(`/api/libros/${id}`);
        setLibro(response.data);
      } catch (error) {
        console.error('Error al obtener el libro', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLibro();
  }, [id]);

  if (loading) return <p>Cargando detalles del libro...</p>;

  return libro ? (
    <div>
      <h2>{libro.titulo}</h2>
      <p>Autor: {libro.autor}</p>
      <p>Género: {libro.genero}</p>
      <p>Descripción: {libro.descripcion}</p>
    </div>
  ) : (
    <p>Libro no encontrado.</p>
  );
}

export default BookDetail;
