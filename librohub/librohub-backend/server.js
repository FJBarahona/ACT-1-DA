const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'librohub'
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.get('/api/libros', (req, res) => {
    db.query('SELECT * FROM libros', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.post('/api/libros', (req, res) => {
    const { titulo, autor, precio, descripcion } = req.body;

    if (!titulo || !autor || !precio || !descripcion) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    const query = 'INSERT INTO libros (titulo, autor, precio, descripcion) VALUES (?, ?, ?, ?)';
    
    db.query(query, [titulo, autor, precio, descripcion], (err, results) => {
        if (err) {
            console.error('Error al agregar libro:', err); 
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Libro agregado exitosamente', id: results.insertId });
    });
});


app.put('/api/libros/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, precio, descripcion } = req.body;
    db.query('UPDATE libros SET titulo = ?, autor = ?, precio = ?, descripcion = ? WHERE id = ?',
    [titulo, autor, precio, descripcion, id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(204);
    });
});

app.delete('/api/libros/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM libros WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(204);
    });
});

app.post('/api/auth/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos.' });
    }

    const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error al registrar el usuario:', err);
            return res.status(500).json({ error: 'Error al registrar el usuario' });
        }
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    });
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(400).send('Usuario no encontrado');

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).send('Contraseña incorrecta');

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
