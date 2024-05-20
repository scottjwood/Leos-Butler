const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const authenticate = require('../middleware/auth');
const { Artist, Project, StorageLocation } = require('../models/db'); // Removed Notification

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

// Fetch a single artist by ID
router.get('/artists/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findByPk(id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json(artist);
  } catch (error) {
    console.error('Error fetching artist:', error);
    res.status(500).json({ error: 'Failed to fetch artist' });
  }
});

// Fetch projects by artist ID
router.get('/artists/:id/projects', async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await Project.findAll({ where: { artist_id: id } });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects for artist:', error);
    res.status(500).json({ error: 'Failed to fetch projects for artist' });
  }
});

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Create a new project
router.post('/projects', async (req, res) => {
  try {
    const { title, description, artist_id, mold_tracking_number, casting_cost, casting_time, material_usage, storage_location } = req.body;
    const project = await Project.create({ title, description, artist_id, mold_tracking_number, casting_cost, casting_time, material_usage, storage_location });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Fetch a single project by ID
router.get('/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Fetch projects by storage location
router.get('/storage-locations/:id/projects', async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await Project.findAll({ where: { storage_location: id } });
    console.log(`Projects for storage location ${id}:`, projects); // Add this line
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects for storage location:', error);
    res.status(500).json({ error: 'Failed to fetch projects for storage location' });
  }
});


// Fetch all storage locations
router.get('/storage-locations', async (req, res) => {
  try {
    const storageLocations = await StorageLocation.findAll();
    res.json(storageLocations);
  } catch (error) {
    console.error('Error fetching storage locations:', error);
    res.status(500).json({ error: 'Failed to fetch storage locations' });
  }
});

// Fetch a single storage location by ID
router.get('/storage-locations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const storageLocation = await StorageLocation.findByPk(id);
    if (!storageLocation) {
      return res.status(404).json({ error: 'Storage location not found' });
    }
    res.json(storageLocation);
  } catch (error) {
    console.error('Error fetching storage location:', error);
    res.status(500).json({ error: 'Failed to fetch storage location' });
  }
});

// Create a new storage location
router.post('/storage-locations', async (req, res) => {
  try {
    const { name, description } = req.body;
    const storageLocation = await StorageLocation.create({ name, description });
    res.status(201).json(storageLocation);
  } catch (error) {
    console.error('Error creating storage location:', error);
    res.status(500).json({ error: 'Failed to create storage location' });
  }
});

// Update an existing storage location
router.put('/storage-locations/:id', async (req, res) => {
  try {
    const storageLocation = await StorageLocation.findByPk(req.params.id);
    if (storageLocation) {
      await storageLocation.update(req.body);
      res.json(storageLocation);
    } else {
      res.status(404).json({ error: 'Storage location not found' });
    }
  } catch (error) {
    console.error('Error updating storage location:', error);
    res.status(500).json({ error: 'Failed to update storage location' });
  }
});

// Delete a storage location
router.delete('/storage-locations/:id', async (req, res) => {
  try {
    const storageLocation = await StorageLocation.findByPk(req.params.id);
    if (storageLocation) {
      await storageLocation.destroy();
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
