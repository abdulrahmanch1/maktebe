const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new book
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    description: req.body.description,
    cover: req.body.cover,
    pages: req.body.pages,
    publishYear: req.body.publishYear,
    language: req.body.language,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a book
router.patch('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (req.body.title != null) book.title = req.body.title;
    if (req.body.author != null) book.author = req.body.author;
    if (req.body.category != null) book.category = req.body.category;
    if (req.body.description != null) book.description = req.body.description;
    if (req.body.cover != null) book.cover = req.body.cover;
    if (req.body.pages != null) book.pages = req.body.pages;
    if (req.body.publishYear != null) book.publishYear = req.body.publishYear;
    if (req.body.language != null) book.language = req.body.language;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await Book.deleteOne({ _id: req.params.id });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
