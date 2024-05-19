const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/auth');
const { Artist, Project, StorageLocation, CastingProcess, User } = require('../models/db'); // Removed Notification

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

module.exports = router;
