const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { username, email, password, domain, position, organisation } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            domain,
            position,
            organisation,
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // // Generate JWT token
        // const token = jwt.sign({ userId: user._id }, 'sd78fhsd8fsd7f8d73f87fh72d3a7sd8f0d0f2f87sd80f8ds7d8f8ds', {
        //     expiresIn: '1h',
        // });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
module.exports = { registerUser, loginUser };
