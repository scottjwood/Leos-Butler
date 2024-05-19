const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth'); // Import auth routes

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.use('/api', authRoutes); // Use auth routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
