const { sequelize, User, Artist, Project, StorageLocation } = require('./db');
const bcrypt = require('bcrypt');

const insertTestData = async () => {
  try {
    await sequelize.sync({ force: true });

    // Seed users
    const users = await User.bulkCreate([
      { username: 'admin', password: await bcrypt.hash('password', 10), role: 'admin' },
      { username: 'user1', password: await bcrypt.hash('password1', 10), role: 'user' },
      { username: 'user2', password: await bcrypt.hash('password2', 10), role: 'user' }
    ]);

    // Seed artists
    const artists = await Artist.bulkCreate([
      { name: 'Michelangelo', contact_details: 'michelangelo@example.com' },
      { name: 'Auguste Rodin', contact_details: 'rodin@example.com' },
      { name: 'Donatello', contact_details: 'donatello@example.com' },
      { name: 'Gian Lorenzo Bernini', contact_details: 'bernini@example.com' },
      { name: 'Pablo Picasso', contact_details: 'picasso@example.com' },
      { name: 'Henry Moore', contact_details: 'moore@example.com' },
      { name: 'Louise Bourgeois', contact_details: 'bourgeois@example.com' },
      { name: 'Constantin Brancusi', contact_details: 'brancusi@example.com' }
    ]);

    // Seed storage locations
    const storageLocations = await StorageLocation.bulkCreate([
      { name: 'Shelf A1', description: 'First shelf in the A row' },
      { name: 'Shelf A2', description: 'Second shelf in the A row' },
      { name: 'Shelf B1', description: 'First shelf in the B row' },
      { name: 'Shelf B2', description: 'Second shelf in the B row' },
      { name: 'Shelf C1', description: 'First shelf in the C row' },
      { name: 'Shelf C2', description: 'Second shelf in the C row' },
      { name: 'Shelf D1', description: 'First shelf in the D row' },
      { name: 'Shelf D2', description: 'Second shelf in the D row' }
    ]);

    // Seed projects
    const projects = [
      // Michelangelo's projects
      { artist_id: artists[0].id, title: 'David', description: 'A masterpiece of Renaissance sculpture.', mold_tracking_number: 'M001', storage_location: storageLocations[0].id, casting_cost: 20000.00, casting_time: '30 days', material_usage: 'Marble', status: 'active', mold_location: 'in-house' },
      { artist_id: artists[0].id, title: 'Pietà', description: 'A Renaissance sculpture in St. Peter\'s Basilica.', mold_tracking_number: 'M002', storage_location: storageLocations[1].id, casting_cost: 25000.00, casting_time: '40 days', material_usage: 'Marble', status: 'active', mold_location: 'in-house' },

      // Rodin's projects
      { artist_id: artists[1].id, title: 'The Thinker', description: 'A bronze sculpture representing philosophy.', mold_tracking_number: 'M003', storage_location: storageLocations[2].id, casting_cost: 15000.00, casting_time: '25 days', material_usage: 'Bronze', status: 'active', mold_location: 'in-house' },
      { artist_id: artists[1].id, title: 'The Kiss', description: 'A marble sculpture depicting a couple.', mold_tracking_number: 'M004', storage_location: storageLocations[3].id, casting_cost: 22000.00, casting_time: '35 days', material_usage: 'Marble', status: 'inactive', mold_location: 'off-site' },

      // Donatello's projects
      { artist_id: artists[2].id, title: 'Gattamelata', description: 'An equestrian statue of the Renaissance period.', mold_tracking_number: 'M005', storage_location: storageLocations[4].id, casting_cost: 18000.00, casting_time: '28 days', material_usage: 'Bronze', status: 'inactive', mold_location: 'off-site' },

      // Bernini's projects
      { artist_id: artists[3].id, title: 'Apollo and Daphne', description: 'A Baroque masterpiece in marble.', mold_tracking_number: 'M006', storage_location: storageLocations[5].id, casting_cost: 22000.00, casting_time: '35 days', material_usage: 'Marble', status: 'active', mold_location: 'in-house' },
      { artist_id: artists[3].id, title: 'The Ecstasy of Saint Teresa', description: 'A Baroque sculpture in Rome.', mold_tracking_number: 'M007', storage_location: storageLocations[6].id, casting_cost: 26000.00, casting_time: '45 days', material_usage: 'Marble', status: 'active', mold_location: 'in-house' },
      { artist_id: artists[3].id, title: 'Rape of Proserpina', description: 'A dynamic Baroque sculpture.', mold_tracking_number: 'M008', storage_location: storageLocations[7].id, casting_cost: 21000.00, casting_time: '33 days', material_usage: 'Marble', status: 'inactive', mold_location: 'off-site' },

      // Picasso's projects
      { artist_id: artists[4].id, title: 'Bull\'s Head', description: 'A bicycle seat and handlebars sculpture.', mold_tracking_number: 'M009', storage_location: storageLocations[0].id, casting_cost: 5000.00, casting_time: '10 days', material_usage: 'Metal', status: 'active', mold_location: 'in-house' },
      { artist_id: artists[4].id, title: 'Woman in the Garden', description: 'A large metal sculpture.', mold_tracking_number: 'M010', storage_location: storageLocations[1].id, casting_cost: 8000.00, casting_time: '20 days', material_usage: 'Metal', status: 'inactive', mold_location: 'off-site' },

      // Henry Moore's projects
      { artist_id: artists[5].id, title: 'Reclining Figure', description: 'A series of abstract reclining figures.', mold_tracking_number: 'M011', storage_location: storageLocations[2].id, casting_cost: 17000.00, casting_time: '32 days', material_usage: 'Bronze', status: 'active', mold_location: 'in-house' },
      { artist_id: artists[5].id, title: 'Family Group', description: 'A sculpture representing family.', mold_tracking_number: 'M012', storage_location: storageLocations[3].id, casting_cost: 19000.00, casting_time: '28 days', material_usage: 'Bronze', status: 'active', mold_location: 'in-house' },

      // Louise Bourgeois's projects
      { artist_id: artists[6].id, title: 'Maman', description: 'A large spider sculpture.', mold_tracking_number: 'M013', storage_location: storageLocations[4].id, casting_cost: 30000.00, casting_time: '50 days', material_usage: 'Steel', status: 'active', mold_location: 'in-house' },
      { artist_id: artists[6].id, title: 'Destruction of the Father', description: 'A powerful psychological piece.', mold_tracking_number: 'M014', storage_location: storageLocations[5].id, casting_cost: 25000.00, casting_time: '40 days', material_usage: 'Plaster', status: 'inactive', mold_location: 'off-site' },

      // Constantin Brancusi's projects
      { artist_id: artists[7].id, title: 'Bird in Space', description: 'An abstract sculpture series.', mold_tracking_number: 'M015', storage_location: storageLocations[6].id, casting_cost: 24000.00, casting_time: '37 days', material_usage: 'Bronze', status: 'active', mold_location: 'in-house' },
      { artist_id: artists[7].id, title: 'Endless Column', description: 'A series of stacked rhomboids.', mold_tracking_number: 'M016', storage_location: storageLocations[7].id, casting_cost: 28000.00, casting_time: '45 days', material_usage: 'Iron', status: 'inactive', mold_location: 'off-site' }
    ];

    for (const project of projects) {
      await Project.create(project);
    }

    console.log('Test data inserted successfully');
  } catch (error) {
    console.error('Error inserting test data:', error);
  } finally {
    await sequelize.close();
  }
};

insertTestData();
