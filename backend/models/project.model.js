// /backend/models/project.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Project;
