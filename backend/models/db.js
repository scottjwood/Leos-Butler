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
  timestamps: true,
});

const Project = sequelize.define('Project', {
  artist_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Artist,
      key: 'id'
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  mold_tracking_number: {
    type: DataTypes.STRING,
  },
  casting_cost: {
    type: DataTypes.DECIMAL(10, 2),
  },
  casting_time: {
    type: DataTypes.STRING,
  },
  material_usage: {
    type: DataTypes.STRING,
  },
  storage_location: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = { sequelize, Artist, Project, User };
