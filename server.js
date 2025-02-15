const express = require('express');
const mysql = require('mysql');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

// load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// MYSQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection error:", err);
    } else {
        console.log("MYSQL Connected...");
    }
});

// CRUD ROUTES

// 1. Get all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Get a single user by id
app.get('/users/:id', (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]);
    });
});

// Add a new user
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    db.query('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', [name, email, age], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({ id: results.insertId, name, email, age });
    });
});

// Update an existing user
app.put('/users/:id', (req, res) => {
    const { name, email, age } = req.body;
    db.query('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?', [name, email, age, req.params.id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'User updated successfully' });
    });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'User deleted successfully' });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});