import React from 'react';

function Cart({ cartItems = [], onRemove }) {
    return (
        <div>
            <h1>Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <p>No hay libros en el carrito.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <h2>{item.titulo}</h2>
                            <p>Autor: {item.autor}</p>
                            <p>Precio: {item.precio}</p>
                            <button onClick={() => onRemove(item.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;
