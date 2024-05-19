const express = require('express');
const router = express.Router();
const { Artist } = require('../models/db');

// Route to fetch all artists
router.get('/artists', async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Failed to fetch artists', details: error.message });
  }
});

// Route to fetch an artist by ID
router.get('/artists/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (artist) {
      res.json(artist);
    } else {
      res.status(404).json({ error: 'Artist not found' });
    }
  } catch (error) {
    console.error('Error fetching artist:', error);
    res.status(500).json({ error: 'Failed to fetch artist', details: error.message });
  }
});

module.exports = router;
