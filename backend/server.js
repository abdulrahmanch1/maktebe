
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Import Routes
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');

// Use Routes
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/maktaba';
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
