// backend/app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Example route for /api/artists
app.get('/api/artists', (req, res) => {
    // Example response, replace with actual data fetching logic
    res.json([{ name: 'Artist 1' }, { name: 'Artist 2' }]);
});

// Middleware to log the request body
app.use((req, res, next) => {
    console.log('Parsed Request Body:', req.body);
    next();
});

app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
