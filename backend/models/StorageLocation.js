// models/StorageLocation.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('foundry_db', 'scott', 'scott', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

const StorageLocation = sequelize.define('StorageLocation', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Project = sequelize.define('Project', {
  // Project fields...
  storage_location: {
    type: DataTypes.INTEGER,
    references: {
      model: StorageLocation,
      key: 'id',
    },
  },
});

StorageLocation.hasMany(Project, { foreignKey: 'storage_location', as: 'projects' });
Project.belongsTo(StorageLocation, { foreignKey: 'storage_location' });

module.exports = { sequelize, StorageLocation, Project };
