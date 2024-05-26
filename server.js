// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS package
const songRoutes = require('./routes/song'); // Import song routes
const annotationRoutes = require('./routes/annotation');
const app = express();
const PORT = process.env.PORT || 3000;// Set the port directly

app.use(cors({
  origin: ['https://chwensun.github.io', 'https://chwensun.github.io/VerseMonk_DEMO'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON bodies
app.use(express.json());
// Connect to MongoDB
mongoose.connect(process.env.mongoDB_access_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API testing: Hello World!');
});

// Use song routes
app.use('/api/songs', songRoutes);

// Use annotation routes
app.use('/api/annotations', annotationRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Handle 404 - Resource Not Found
app.use((req, res, next) => {
  res.status(404).send("We couldn't find what you were looking for!");
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

