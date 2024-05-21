const { sequelize, Artist, Project } = require('../models/db');

async function resetDatabase() {
  await sequelize.sync({ force: true });

  const artists = [
    { name: 'Michelangelo', projects: [
      { title: 'David', description: 'A masterpiece of Renaissance sculpture created between 1501 and 1504.' },
      { title: 'Pietà', description: 'A renowned sculpture housed in St. Peter\'s Basilica, Vatican City.' },
      { title: 'Moses', description: 'A marble sculpture created in 1513-1515.' },
      { title: 'Bacchus', description: 'A marble sculpture of the Roman god of wine.' },
    ]},
    { name: 'Donatello', projects: [
      { title: 'David', description: 'A bronze statue, one of the most famous works by Donatello.' },
      { title: 'Saint Mark', description: 'A marble statue created for Orsanmichele, Florence.' },
      { title: 'Gattamelata', description: 'An equestrian statue of the condottiero Erasmo da Narni.' },
    ]},
    { name: 'Auguste Rodin', projects: [
      { title: 'The Thinker', description: 'One of Rodin\'s most famous sculptures.' },
      { title: 'The Kiss', description: 'A marble sculpture depicting a couple in a passionate embrace.' },
      { title: 'The Burghers of Calais', description: 'A group of six men sacrificing themselves for the city.' },
      { title: 'The Gates of Hell', description: 'A monumental sculptural group work.' },
      { title: 'Balzac', description: 'A portrait statue of the French writer Honoré de Balzac.' },
      { title: 'The Age of Bronze', description: 'A life-size male nude that debuted in 1877.' },
    ]},
    { name: 'Gian Lorenzo Bernini', projects: [
      { title: 'Apollo and Daphne', description: 'A marble sculpture depicting the climax of the story of Daphne and Apollo.' },
      { title: 'Ecstasy of Saint Teresa', description: 'A central sculptural group in white marble set in an elevated aedicule.' },
      { title: 'David', description: 'A life-sized sculpture of the biblical David.' },
      { title: 'The Rape of Proserpina', description: 'A large Baroque marble sculptural group.' },
      { title: 'Bust of Louis XIV', description: 'A portrait sculpture of the King of France.' },
    ]},
    { name: 'Henry Moore', projects: [
      { title: 'Reclining Figure', description: 'A series of sculptures depicting a reclining human figure.' },
      { title: 'Family Group', description: 'A sculpture depicting a family of two adults and one child.' },
    ]},
    { name: 'Constantin Brâncuși', projects: [
      { title: 'Bird in Space', description: 'A series of sculptures representing a bird in flight.' },
      { title: 'The Endless Column', description: 'A monumental sculpture symbolizing the concept of infinity.' },
      { title: 'Sleeping Muse', description: 'A sculpture depicting a woman\'s head, peacefully resting.' },
    ]},
    { name: 'Alberto Giacometti', projects: [
      { title: 'Walking Man I', description: 'A bronze sculpture of a man in motion.' },
      { title: 'Standing Woman', description: 'A tall, thin bronze sculpture of a woman.' },
      { title: 'Dog', description: 'A bronze sculpture representing a dog.' },
      { title: 'The Chariot', description: 'A bronze sculpture depicting a goddess on a chariot.' },
    ]},
    { name: 'Alexander Calder', projects: [
      { title: 'Lobster Trap and Fish Tail', description: 'A mobile sculpture that is part of Calder\'s kinetic art series.' },
    ]},
    { name: 'Jean Arp', projects: [
      { title: 'Human Concretion', description: 'A sculpture reflecting organic, abstract forms.' },
      { title: 'Bird in an Aquarium', description: 'A wooden relief sculpture.' },
    ]},
    { name: 'Louise Bourgeois', projects: [
      { title: 'Maman', description: 'A large-scale bronze, stainless steel, and marble sculpture of a spider.' },
      { title: 'Cell (Eyes and Mirrors)', description: 'An installation sculpture involving mirrors and other materials.' },
      { title: 'Destruction of the Father', description: 'A mixed-media sculpture.' },
      { title: 'Spider', description: 'A series of sculptures depicting spiders.' },
      { title: 'Cumul I', description: 'A marble sculpture depicting soft, rounded forms.' },
      { title: 'Arch of Hysteria', description: 'A sculpture of a human body in a backbend.' },
    ]},
  ];

  for (const artistData of artists) {
    const artist = await Artist.create({ name: artistData.name });
    console.log(`Created artist: ${artist.name}`);
    for (const projectData of artistData.projects) {
      const project = await Project.create({
        title: projectData.title,
        description: projectData.description,
        mold_tracking_number: `MTN${Math.floor(Math.random() * 10000)}`,
        casting_cost: Math.floor(Math.random() * 10000) + 1000,
        casting_time: `${Math.floor(Math.random() * 10) + 1} days`,
        material_usage: `${Math.floor(Math.random() * 100) + 10} kg`,
        storage_location: `Location ${Math.floor(Math.random() * 10) + 1}`,
        status: Math.random() < 0.5 ? 'active' : 'inactive',
        currentStation: `Station ${Math.floor(Math.random() * 5) + 1}`,
        estimatedCompletionDate: new Date(),
        artist_id: artist.id, // Ensure the project is associated with the artist
      });
      console.log(`Created project: ${project.title} for artist: ${artist.name}`);
    }
  }

  console.log('Database has been reset and populated with test data.');
}

resetDatabase().catch(err => console.error(err));
