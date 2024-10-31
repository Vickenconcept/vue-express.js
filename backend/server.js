// backend/server.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
// mongoose.connect('mongodb+srv://vicken:Vicken111@<cluster-name>.mongodb.net/firstnodeapp?retryWrites=true&w=majority')
mongoose.connect('mongodb://localhost:27017/firstnodeapp')
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// API Routes

app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


