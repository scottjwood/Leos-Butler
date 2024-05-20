const { sequelize } = require('./db');

const resetDB = async () => {
  try {
    await sequelize.drop();
    console.log('All tables dropped successfully.');
  } catch (error) {
    console.error('Error dropping tables:', error);
  } finally {
    await sequelize.close();
  }
};

resetDB();
