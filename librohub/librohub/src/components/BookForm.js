import React, { useState } from 'react';
import axios from 'axios';

function BookForm() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/libros', { titulo, autor, precio, descripcion });
      setMensaje('Libro agregado exitosamente');
      setTitulo('');
      setAutor('');
      setPrecio('');
      setDescripcion('');
    } catch (error) {
      setMensaje('Error al agregar el libro: ' + error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Agregar Libro</h2>
      <div className="form-group">
        <input 
          className="form-control" 
          type="text" 
          placeholder="Título" 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <input 
          className="form-control" 
          type="text" 
          placeholder="Autor" 
          value={autor} 
          onChange={(e) => setAutor(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <input 
          className="form-control" 
          type="number"
          placeholder="Precio" 
          value={precio} 
          onChange={(e) => setPrecio(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <textarea 
          className="form-control" 
          placeholder="Descripción" 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
          required 
        />
      </div>
      <button type="submit" className="button">Agregar</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}

export default BookForm;
