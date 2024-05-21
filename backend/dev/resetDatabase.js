const bcrypt = require('bcrypt');
const { sequelize, User, Artist, Project, Notification } = require('../models/db');

const resetDatabase = async () => {
  try {
    // Drop and recreate tables
    await sequelize.sync({ force: true });

    // Insert test data
    const users = [
      { username: 'admin', password: await bcrypt.hash('password123', 10), role: 'admin' }
    ];
    const artists = [
      { name: 'Michelangelo', contact_details: 'michelangelo@example.com' },
      { name: 'Auguste Rodin', contact_details: 'rodin@example.com' },
      { name: 'Donatello', contact_details: 'donatello@example.com' },
      { name: 'Gian Lorenzo Bernini', contact_details: 'bernini@example.com' }
    ];
    const projects = [
      {
        artist_id: 1,  // Michelangelo
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
        artist_id: 2,  // Auguste Rodin
        title: 'The Thinker',
        description: 'A bronze sculpture representing philosophy.',
        mold_tracking_number: 'M002',
        casting_cost: 15000.00,
        casting_time: '25 days',
        material_usage: 'Bronze',
        storage_location: 'A1-02',
        status: 'inactive',
        mold_location: 'off-site'
      },
      {
        artist_id: 3,  // Donatello
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
        artist_id: 4,  // Gian Lorenzo Bernini
        title: 'Apollo and Daphne',
        description: 'A Baroque masterpiece in marble.',
        mold_tracking_number: 'M004',
        casting_cost: 22000.00,
        casting_time: '35 days',
        material_usage: 'Marble',
        storage_location: 'A1-04',
        status: 'inactive',
        mold_location: 'off-site'
      }
    ];

    // Bulk create
    await User.bulkCreate(users);
    await Artist.bulkCreate(artists);
    await Project.bulkCreate(projects);

    console.log('Database reset and test data inserted successfully.');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await sequelize.close();
  }
};

resetDatabase();
