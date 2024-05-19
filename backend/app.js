// backend/app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

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
