const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('foundry_db', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'postgres',
});

const Artist = sequelize.define('Artist', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_details: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true, // This will automatically handle createdAt and updatedAt
});

module.exports = { sequelize, Artist };
