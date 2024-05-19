const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/db');

console.log('Auth routes loaded'); // Log message to confirm loading

// Register route
router.post('/register', async (req, res) => {
  console.log(req.body); // Log the request body for debugging
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword, role });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

module.exports = router;
