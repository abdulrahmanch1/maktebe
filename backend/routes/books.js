const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Middleware to get book by ID
async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one book
router.get('/:id', getBook, (req, res) => {
  res.json(res.book);
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
router.patch('/:id', getBook, async (req, res) => {
  if (req.body.title != null) res.book.title = req.body.title;
  if (req.body.author != null) res.book.author = req.body.author;
  if (req.body.category != null) res.book.category = req.body.category;
  if (req.body.description != null) res.book.description = req.body.description;
  if (req.body.cover != null) res.book.cover = req.body.cover;
  if (req.body.pages != null) res.book.pages = req.body.pages;
  if (req.body.publishYear != null) res.book.publishYear = req.body.publishYear;
  if (req.body.language != null) res.book.language = req.body.language;

  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book
router.delete('/:id', getBook, async (req, res) => {
  try {
    await res.book.deleteOne();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
