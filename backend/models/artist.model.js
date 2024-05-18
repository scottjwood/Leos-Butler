// /backend/models/artist.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Artist = sequelize.define('Artist', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Artist;
