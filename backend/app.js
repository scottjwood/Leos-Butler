const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const { sequelize } = require('./models/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
