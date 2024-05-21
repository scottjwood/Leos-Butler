const { sequelize } = require('./db');

sequelize.sync({ force: true }) // Use `force: false` in production
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Error creating database:', error);
  });
