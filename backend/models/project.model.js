// Import necessary dependencies
const { DataTypes } = require('sequelize');
const db = require('../config/sequelize.config');

// Define the Project model
const Project = db.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
  currentStation: {
    type: DataTypes.STRING,
  },
  estimatedCompletionDate: {
    type: DataTypes.DATE,
  },
});

module.exports = Project;
