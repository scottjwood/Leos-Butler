// /backend/models/index.js

const Artist = require('./artist.model');
const Project = require('./project.model');

Artist.hasMany(Project, { foreignKey: 'artistId' });
Project.belongsTo(Artist, { foreignKey: 'artistId' });

module.exports = { Artist, Project };
