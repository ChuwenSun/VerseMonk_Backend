// server.js
const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const User = require('./models/User'); // Make sure all your models are imported

const app = express();
const PORT = 3000; // Set the port directly

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api/auth', authRoutes);  // Mount auth routes

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ force: false }); // Set to true only if you want to drop and re-create tables
  })
  .then(() => {
    console.log('Database & tables created!');
    // Start the server after database sync
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Add more routes as needed
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send(err.message);
    }
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
