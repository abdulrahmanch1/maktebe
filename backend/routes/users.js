const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, // In a real app, hash this password!
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// User login (basic example, no actual authentication yet)
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, password: req.body.password }); // Again, no hashing here
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Logged in successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users (for admin purposes, or remove if not needed)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.username != null) user.username = req.body.username;
    if (req.body.email != null) user.email = req.body.email;
    if (req.body.password != null) user.password = req.body.password; // Hash this!
    if (req.body.favorites != null) user.favorites = req.body.favorites;
    if (req.body.readingList != null) user.readingList = req.body.readingList;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Add a book to user's favorites
router.post('/:userId/favorites', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { bookId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.favorites.includes(bookId)) {
      user.favorites.push(bookId);
      await user.save();
    }
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a book from user's favorites
router.delete('/:userId/favorites/:bookId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favorites = user.favorites.filter(favId => favId.toString() !== bookId);
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

