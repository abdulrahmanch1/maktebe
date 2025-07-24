
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Set Mongoose strictQuery to true
mongoose.set("strictQuery", true);

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

// Handle 404 - Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).send('Something broke!');
});

// Connect to MongoDB
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/maktaba';

if (!DB_URI) {
  console.error("❌ MONGO_URI not defined in environment variables. Exiting...");
  process.exit(1); // Stop the server if DB_URI is not defined
}

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit process on connection failure
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
