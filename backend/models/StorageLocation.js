const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const StorageLocation = sequelize.define('StorageLocation', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = StorageLocation;
