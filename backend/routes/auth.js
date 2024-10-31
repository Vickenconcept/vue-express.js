// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/authMiddleware');
const User = require('../models/User');


router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/protected', verifyToken, (req, res) => {
    res.send('This is a protected route, and you are authorized!');
});
// Login route
;


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        // Create and assign a token
        const your_jwt_secret = process.env.JWT_SECRET;
        const token = jwt.sign({ userId: user._id }, your_jwt_secret, { expiresIn: '1h' }); // Replace 'your_jwt_secret' with your actual secret
        res.status(200).json({ token, user, status: true });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error, status: false });
    }
});


router.post('/user', verifyToken, async (req, res) => {
    const { email } = req.body; // Assuming the email is sent in the request body

    try {
        // Retrieve user information from the database
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // If user exists, return user information (excluding password)
        res.status(200).json({
            message: 'User found!',
            user: {
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
