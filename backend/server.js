// /backend/server.js

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/sequelize.config');
const apiRoutes = require('./routes/api');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Foundry App API');
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
