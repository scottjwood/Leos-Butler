const { sequelize, Artist, Project, StorageLocation, User } = require('./db');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed Artists
  const artists = await Artist.bulkCreate([
    { name: 'Michelangelo', contact_details: 'michelangelo@example.com' },
    { name: 'Auguste Rodin', contact_details: 'rodin@example.com' },
    { name: 'Donatello', contact_details: 'donatello@example.com' },
    { name: 'Gian Lorenzo Bernini', contact_details: 'bernini@example.com' },
  ]);

  // Seed Projects
  const projects = await Project.bulkCreate([
    {
      artist_id: artists[0].id,
      title: 'David',
      description: 'A masterpiece of Renaissance sculpture.',
      mold_tracking_number: 'M001',
      casting_cost: 20000.00,
      casting_time: '30 days',
      material_usage: 'Marble',
      storage_location: 'A1-01',
      status: 'active',
      mold_location: 'in-house'
    },
    {
      artist_id: artists[1].id,
      title: 'The Thinker',
      description: 'A bronze sculpture representing philosophy.',
      mold_tracking_number: 'M002',
      casting_cost: 15000.00,
      casting_time: '25 days',
      material_usage: 'Bronze',
      storage_location: 'A1-02',
      status: 'active',
      mold_location: 'in-house'
    },
    {
      artist_id: artists[2].id,
      title: 'Gattamelata',
      description: 'An equestrian statue of the Renaissance period.',
      mold_tracking_number: 'M003',
      casting_cost: 18000.00,
      casting_time: '28 days',
      material_usage: 'Bronze',
      storage_location: 'A1-03',
      status: 'active',
      mold_location: 'in-house'
    },
    {
      artist_id: artists[3].id,
      title: 'Apollo and Daphne',
      description: 'A Baroque masterpiece in marble.',
      mold_tracking_number: 'M004',
      casting_cost: 22000.00,
      casting_time: '35 days',
      material_usage: 'Marble',
      storage_location: 'A1-04',
      status: 'active',
      mold_location: 'in-house'
    }
  ]);

  // Seed Storage Locations
  const storageLocations = await StorageLocation.bulkCreate([
    { name: 'Shelf A1', description: 'First shelf in the A row' },
    { name: 'Shelf A2', description: 'Second shelf in the A row' },
    { name: 'Shelf B1', description: 'First shelf in the B row' },
    { name: 'Shelf B2', description: 'Second shelf in the B row' },
  ]);

  // Seed Users
  const hashedPassword = await bcrypt.hash('password123', 10);
  const users = await User.bulkCreate([
    { username: 'admin', password: hashedPassword, role: 'admin' },
    { username: 'user', password: hashedPassword, role: 'user' },
  ]);

  console.log('Database seeded successfully.');
  process.exit();
};

seedDatabase();
