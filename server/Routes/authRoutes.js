// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Validate that username and password are provided
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
      }
      
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ error: 'Username is already taken. Please choose another one.' });
      }
      
      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      
      return res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      console.error('Error during signup:', error);
      return res.status(500).json({ error: 'An error occurred while creating the user. Please try again later.' });
    }
  });
  

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Validate request body
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
      }
  
      // Check if the user exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }
  
      // Verify the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }
  
      // Generate JWT token with expiration (optional: adjust expiration as needed)
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      return res.json({ token, "userData" : user });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal server error while logging in.' });
    }
  });
  

module.exports = router;