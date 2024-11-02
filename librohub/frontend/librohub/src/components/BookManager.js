import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookManager = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        titulo: '',
        autor: '',
        precio: '',
        descripcion: '',
    });
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:5000/api/libros');
        setBooks(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const addBook = async () => {
        await axios.post('http://localhost:5000/api/libros', newBook);
        setNewBook({ titulo: '', autor: '', precio: '', descripcion: '' });
        fetchBooks();
    };

    const updateBook = async (id) => {
        await axios.put(`http://localhost:5000/api/libros/${id}`, newBook);
        setNewBook({ titulo: '', autor: '', precio: '', descripcion: '' });
        setEditingBook(null);
        fetchBooks();
    };

    const deleteBook = async (id) => {
        await axios.delete(`http://localhost:5000/api/libros/${id}`);
        fetchBooks();
    };

    return (
        <div>
            <h1>Gestión de Libros</h1>
            <input type="text" name="titulo" value={newBook.titulo} onChange={handleChange} placeholder="Título" />
            <input type="text" name="autor" value={newBook.autor} onChange={handleChange} placeholder="Autor" />
            <input type="number" name="precio" value={newBook.precio} onChange={handleChange} placeholder="Precio" />
            <textarea name="descripcion" value={newBook.descripcion} onChange={handleChange} placeholder="Descripción"></textarea>
            {editingBook ? (
                <button onClick={() => updateBook(editingBook)}>Actualizar Libro</button>
            ) : (
                <button onClick={addBook}>Agregar Libro</button>
            )}
            
            <h2>Lista de Libros</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.titulo}</strong> - {book.autor} - ${book.precio}
                        <button onClick={() => { setEditingBook(book.id); setNewBook(book); }}>Editar</button>
                        <button onClick={() => deleteBook(book.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookManager;
