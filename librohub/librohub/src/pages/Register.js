// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Cambia useHistory por useNavigate

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Usar useNavigate

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password });
            alert('Usuario registrado con éxito');
            navigate('/login'); // Redirigir a la página de login después del registro
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert('Error al registrar el usuario');
        }
    };

    return (
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Nombre de usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
