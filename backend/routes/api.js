const express = require('express');
const router = express.Router();
const { Artist } = require('../models/db');

// Get all artists
router.get('/artists', async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
});

// Get a single artist by ID
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
    res.status(500).json({ error: 'Failed to fetch artist' });
  }
});

// Create a new artist
router.post('/artists', async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (error) {
    console.error('Error creating artist:', error);
    res.status(500).json({ error: 'Failed to create artist' });
  }
});

// Update an existing artist
router.put('/artists/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (artist) {
      await artist.update(req.body);
      res.json(artist);
    } else {
      res.status(404).json({ error: 'Artist not found' });
    }
  } catch (error) {
    console.error('Error updating artist:', error);
    res.status(500).json({ error: 'Failed to update artist' });
  }
});

// Delete an artist
router.delete('/artists/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (artist) {
      await artist.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Artist not found' });
    }
  } catch (error) {
    console.error('Error deleting artist:', error);
    res.status(500).json({ error: 'Failed to delete artist' });
  }
});

module.exports = router;
