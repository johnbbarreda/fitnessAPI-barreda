const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ email, password: hashedPassword });
    
    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(400).json({ error: 'Email already exists.' });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }
    
    const access = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ access });
};

// Get User Details
exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from the authenticated token
        const user = await User.findById(userId).select('email'); // Only fetch email

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Return user details in the desired format
        res.json({
            user: {
                id: user._id,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user details.' });
    }
};
