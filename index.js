"use strict";
require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  next();
});

// Mock user data (replace this with a real database in a production environment)
const users = [
  { username: 'WunmiCrown117', password: '123456789' },
];

app.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the provided username and password match a user in the database
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      res.json({ success: true, message: 'Authentication successful' });
    } else {
      res.status(401).json({ success: false, message: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
