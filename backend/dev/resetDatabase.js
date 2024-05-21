const { sequelize, Artist, Project } = require('../models/db.js');

async function resetDatabase() {
  await sequelize.sync({ force: true });

  const artists = [
    { name: 'Michelangelo', projects: 4 },
    { name: 'Donatello', projects: 3 },
    { name: 'Auguste Rodin', projects: 6 },
    { name: 'Gian Lorenzo Bernini', projects: 5 },
    { name: 'Henry Moore', projects: 2 },
    { name: 'Constantin Brâncuși', projects: 3 },
    { name: 'Alberto Giacometti', projects: 4 },
    { name: 'Alexander Calder', projects: 1 },
    { name: 'Jean Arp', projects: 2 },
    { name: 'Louise Bourgeois', projects: 6 }
  ];

  for (const artistData of artists) {
    const artist = await Artist.create({ name: artistData.name });
    for (let i = 0; i < artistData.projects; i++) {
      await Project.create({
        title: `Project ${i + 1}`,
        description: `Description for Project ${i + 1}`,
        mold_tracking_number: `MTN${i + 1}`,
        casting_cost: Math.floor(Math.random() * 10000) + 1000,
        casting_time: `${Math.floor(Math.random() * 10) + 1} days`,
        material_usage: `${Math.floor(Math.random() * 100) + 10} kg`,
        storage_location: `Location ${Math.floor(Math.random() * 10) + 1}`,
        status: Math.random() < 0.5 ? 'active' : 'inactive',
        currentStation: `Station ${Math.floor(Math.random() * 5) + 1}`,
        estimatedCompletionDate: new Date(),
        ArtistId: artist.id
      });
    }
  }

  console.log('Database has been reset and populated with test data.');
}

resetDatabase().catch(err => console.error(err));
