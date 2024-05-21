'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Notifications');
  },
  down: async (queryInterface, Sequelize) => {
    // Optionally, add code to recreate the table if needed
    await queryInterface.createTable('Notifications', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      // add other columns here if needed
    });
  }
};
