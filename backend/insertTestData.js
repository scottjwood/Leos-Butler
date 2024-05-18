const pool = require('./models/db');  // Adjust the path to your db.js file

const insertTestData = async () => {
    try {
        // Insert artists
        const artists = [
            { name: 'Michelangelo' },
            { name: 'Auguste Rodin' },
            { name: 'Donatello' },
            { name: 'Gian Lorenzo Bernini' }
        ];

        for (const artist of artists) {
            await pool.query('INSERT INTO artists (name) VALUES ($1) RETURNING id', [artist.name]);
        }

        // Insert projects
        const projects = [
            {
                artist_id: 1,  // Michelangelo
                title: 'David',
                description: 'A masterpiece of Renaissance sculpture.',
                mold_tracking_number: 'M001',
                casting_cost: 20000.00,
                casting_time: '30 days',
                material_usage: 'Marble',
                storage_location: 'A1-01'
            },
            {
                artist_id: 2,  // Auguste Rodin
                title: 'The Thinker',
                description: 'A bronze sculpture representing philosophy.',
                mold_tracking_number: 'M002',
                casting_cost: 15000.00,
                casting_time: '25 days',
                material_usage: 'Bronze',
                storage_location: 'A1-02'
            },
            {
                artist_id: 3,  // Donatello
                title: 'Gattamelata',
                description: 'An equestrian statue of the Renaissance period.',
                mold_tracking_number: 'M003',
                casting_cost: 18000.00,
                casting_time: '28 days',
                material_usage: 'Bronze',
                storage_location: 'A1-03'
            },
            {
                artist_id: 4,  // Gian Lorenzo Bernini
                title: 'Apollo and Daphne',
                description: 'A Baroque masterpiece in marble.',
                mold_tracking_number: 'M004',
                casting_cost: 22000.00,
                casting_time: '35 days',
                material_usage: 'Marble',
                storage_location: 'A1-04'
            }
        ];

        for (const project of projects) {
            await pool.query(
                'INSERT INTO projects (artist_id, title, description, mold_tracking_number, casting_cost, casting_time, material_usage, storage_location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [
                    project.artist_id,
                    project.title,
                    project.description,
                    project.mold_tracking_number,
                    project.casting_cost,
                    project.casting_time,
                    project.material_usage,
                    project.storage_location
                ]
            );
        }

        console.log('Test data inserted successfully.');
    } catch (error) {
        console.error('Error inserting test data:', error);
    } finally {
        pool.end();
    }
};

insertTestData();
