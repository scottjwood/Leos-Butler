const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { Artist, Project, StorageLocation } = require('../models/db');

// StorageLocation Routes

// Get all storage locations
router.get('/storage-locations', authenticate, async (req, res) => {
  try {
    const locations = await StorageLocation.findAll();
    res.json(locations);
  } catch (error) {
    console.error('Error fetching storage locations:', error);
    res.status(500).json({ error: 'Failed to fetch storage locations' });
  }
});

// Get a single storage location by ID
router.get('/storage-locations/:id', authenticate, async (req, res) => {
  try {
    const location = await StorageLocation.findByPk(req.params.id);
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ error: 'Storage location not found' });
    }
  } catch (error) {
    console.error('Error fetching storage location:', error);
    res.status(500).json({ error: 'Failed to fetch storage location' });
  }
});

// Create a new storage location
router.post('/storage-locations', authenticate, async (req, res) => {
  try {
    const location = await StorageLocation.create(req.body);
    res.status(201).json(location);
  } catch (error) {
    console.error('Error creating storage location:', error);
    res.status(500).json({ error: 'Failed to create storage location' });
  }
});

// Update an existing storage location
router.put('/storage-locations/:id', authenticate, async (req, res) => {
  try {
    const location = await StorageLocation.findByPk(req.params.id);
    if (location) {
      await location.update(req.body);
      res.json(location);
    } else {
      res.status(404).json({ error: 'Storage location not found' });
    }
  } catch (error) {
    console.error('Error updating storage location:', error);
    res.status(500).json({ error: 'Failed to update storage location' });
  }
});

// Delete a storage location
router.delete('/storage-locations/:id', authenticate, async (req, res) => {
  try {
    const location = await StorageLocation.findByPk(req.params.id);
    if (location) {
      await location.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Storage location not found' });
    }
  } catch (error) {
    console.error('Error deleting storage location:', error);
    res.status(500).json({ error: 'Failed to delete storage location' });
  }
});

module.exports = router;
