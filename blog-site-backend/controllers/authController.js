const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

// Load the .env file into process.env
dotenv.config({ path: path.join(__dirname, '.env') });

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, userId: user._id, name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password,"email, password")
    
    const user = await User.findOne({ email });
    console.log(user,"user")
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ token, userId: user._id, name: user.name });
  } catch (error) {
    console.log(error,"error")
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { signup, login };