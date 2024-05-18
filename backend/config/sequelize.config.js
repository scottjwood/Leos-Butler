// /backend/config/sequelize.config.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('foundry_db', 'scott', 'scott', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
