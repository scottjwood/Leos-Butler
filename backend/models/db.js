const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('foundry_db', 'scott', 'scott', {
  host: '127.0.0.1',
  dialect: 'postgres'
});

const Artist = sequelize.define('Artist', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact_details: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

const Project = sequelize.define('Project', {
  artist_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Artist,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mold_tracking_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  casting_cost: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  casting_time: {
    type: DataTypes.STRING,
    allowNull: true
  },
  material_usage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  storage_location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active'
  },
  mold_location: {
    type: DataTypes.ENUM('in-house', 'off-site'),
    allowNull: false,
    defaultValue: 'in-house'
  }
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Notification = sequelize.define('Notification', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

User.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });
Artist.hasMany(Project, { foreignKey: 'artist_id' });
Project.belongsTo(Artist, { foreignKey: 'artist_id' });

module.exports = { sequelize, User, Artist, Project, Notification };
