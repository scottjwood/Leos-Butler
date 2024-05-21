const { sequelize, Artist, Project } = require('./models/db');

const insertTestData = async () => {
    try {
        await sequelize.sync({ force: true });  // Ensure tables are created

        // Insert artists
        const artists = [
            { name: 'Michelangelo', contact_details: 'michelangelo@example.com' },
            { name: 'Auguste Rodin', contact_details: 'rodin@example.com' },
            { name: 'Donatello', contact_details: 'donatello@example.com' },
            { name: 'Gian Lorenzo Bernini', contact_details: 'bernini@example.com' }
        ];

        const createdArtists = await Artist.bulkCreate(artists, { returning: true });

        // Insert projects
        const projects = [
            {
                artist_id: createdArtists[0].id,  // Michelangelo
                title: 'David',
                description: 'A masterpiece of Renaissance sculpture.',
                mold_tracking_number: 'M001',
                casting_cost: 20000.00,
                casting_time: '30 days',
                material_usage: 'Marble',
                storage_location: 'A1-01'
            },
            {
                artist_id: createdArtists[1].id,  // Auguste Rodin
                title: 'The Thinker',
                description: 'A bronze sculpture representing philosophy.',
                mold_tracking_number: 'M002',
                casting_cost: 15000.00,
                casting_time: '25 days',
                material_usage: 'Bronze',
                storage_location: 'A1-02'
            },
            {
                artist_id: createdArtists[2].id,  // Donatello
                title: 'Gattamelata',
                description: 'An equestrian statue of the Renaissance period.',
                mold_tracking_number: 'M003',
                casting_cost: 18000.00,
                casting_time: '28 days',
                material_usage: 'Bronze',
                storage_location: 'A1-03'
            },
            {
                artist_id: createdArtists[3].id,  // Gian Lorenzo Bernini
                title: 'Apollo and Daphne',
                description: 'A Baroque masterpiece in marble.',
                mold_tracking_number: 'M004',
                casting_cost: 22000.00,
                casting_time: '35 days',
                material_usage: 'Marble',
                storage_location: 'A1-04'
            }
        ];

        await Project.bulkCreate(projects);

        console.log('Test data inserted successfully.');
    } catch (error) {
        console.error('Error inserting test data:', error);
    } finally {
        await sequelize.close();
    }
};

insertTestData();
