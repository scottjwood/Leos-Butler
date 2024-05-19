const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('foundry_db', 'scott', 'scott', {
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

const StorageLocation = sequelize.define('StorageLocation', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  capacity: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: true,
});

const CastingProcess = sequelize.define('CastingProcess', {
  project_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Project,
      key: 'id'
    },
  },
  step_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
  },
  time_required: {
    type: DataTypes.STRING,
  },
  material_used: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

const Notification = sequelize.define('Notification', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

User.hasMany(Notification, { foreignKey: 'user_id' });
Project.belongsTo(StorageLocation, { foreignKey: 'storage_location' });
CastingProcess.belongsTo(Project, { foreignKey: 'project_id' });

module.exports = { sequelize, Artist, Project, User, StorageLocation, CastingProcess, Notification };
