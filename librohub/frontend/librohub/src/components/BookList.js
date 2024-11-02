import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from '../pages/Cart';

function BookList() {
    const [libros, setLibros] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [editBook, setEditBook] = useState(null); 
    const [bookData, setBookData] = useState({ titulo: '', autor: '', precio: '', descripcion: '' }); 

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/libros');
                setLibros(response.data);
            } catch (error) {
                console.error('Error al obtener libros:', error);
            }
        };

        fetchLibros();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/libros/${id}`);
            setLibros(libros.filter(libro => libro.id !== id));
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
        }
    };

    const handleAddToCart = (libro) => {
        setCartItems([...cartItems, libro]);
        console.log('Cart Items:', cartItems); 
    };

    const handleRemoveFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleEditClick = (libro) => {
        setEditBook(libro.id); 
        setBookData({
            titulo: libro.titulo,
            autor: libro.autor,
            precio: libro.precio,
            descripcion: libro.descripcion,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/libros/${editBook}`, bookData);
            // Volver a obtener la lista de libros
            const response = await axios.get('http://localhost:5000/api/libros');
            setLibros(response.data);
            setEditBook(null); 
            setBookData({ titulo: '', autor: '', precio: '', descripcion: '' }); 
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value,
        });
    };

    return (
        <div>
            <h1>Lista de Libros</h1>
            <ul>
                {libros.map(libro => (
                    <li key={libro.id}>
                        <h2>{libro.titulo}</h2>
                        <p>Autor: {libro.autor}</p>
                        <p>Precio: {libro.precio}</p>
                        <p>Descripción: {libro.descripcion}</p>
                        <button onClick={() => handleAddToCart(libro)}>Agregar al Carrito</button>
                        <button onClick={() => handleDelete(libro.id)}>Eliminar</button>
                        <button onClick={() => handleEditClick(libro)}>Editar</button>
                    </li>
                ))}
            </ul>

            {editBook && (
                <form onSubmit={handleUpdate}>
                    <h2>Editar Libro</h2>
                    <input
                        type="text"
                        name="titulo"
                        value={bookData.titulo}
                        onChange={handleChange}
                        placeholder="Título"
                        required
                    />
                    <input
                        type="text"
                        name="autor"
                        value={bookData.autor}
                        onChange={handleChange}
                        placeholder="Autor"
                        required
                    />
                    <input
                        type="number"
                        name="precio"
                        value={bookData.precio}
                        onChange={handleChange}
                        placeholder="Precio"
                        required
                    />
                    <textarea
                        name="descripcion"
                        value={bookData.descripcion}
                        onChange={handleChange}
                        placeholder="Descripción"
                        required
                    />
                    <button type="submit">Actualizar Libro</button>
                    <button type="button" onClick={() => setEditBook(null)}>Cancelar</button>
                </form>
            )}

            <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} />
        </div>
    );
}

export default BookList;
