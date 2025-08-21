// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// express app
const app = express();

// middleware
app.use(express.json());

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));

// Import routes
const pdfRoutes = require('./routes/pdf');
const geminiRoutes = require('./routes/improveLife'); // <-- ADD THIS LINE
const improveLifeRoutes = require('./routes/improveLife'); // if you also created this route

// Use routes
app.use('/api/pdf', pdfRoutes);
app.use('/api/gemini', geminiRoutes);
app.use('/api', improveLifeRoutes); // if you're also using this route



// Log requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Define routes for each page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to database');
        // Listen to port
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port', process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });