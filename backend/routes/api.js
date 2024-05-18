// /backend/routes/api.js

const express = require('express');
const router = express.Router();
const { Artist, Project } = require('../models');

router.get('/artists', async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
});

router.get('/artists/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id, {
      include: Project,
    });
    if (artist) {
      res.json(artist);
    } else {
      res.status(404).json({ error: 'Artist not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch artist' });
  }
});

module.exports = router;
