const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { Artist, Project, StorageLocation, CastingProcess } = require('../models/db');

// CastingProcess Routes

// Get all casting processes for a project
router.get('/projects/:projectId/casting-processes', authenticate, async (req, res) => {
  try {
    const processes = await CastingProcess.findAll({ where: { project_id: req.params.projectId } });
    res.json(processes);
  } catch (error) {
    console.error('Error fetching casting processes:', error);
    res.status(500).json({ error: 'Failed to fetch casting processes' });
  }
});

// Get a single casting process by ID
router.get('/casting-processes/:id', authenticate, async (req, res) => {
  try {
    const process = await CastingProcess.findByPk(req.params.id);
    if (process) {
      res.json(process);
    } else {
      res.status(404).json({ error: 'Casting process not found' });
    }
  } catch (error) {
    console.error('Error fetching casting process:', error);
    res.status(500).json({ error: 'Failed to fetch casting process' });
  }
});

// Create a new casting process
router.post('/projects/:projectId/casting-processes', authenticate, async (req, res) => {
  try {
    const { step_name, description, cost, time_required, material_used } = req.body;
    const process = await CastingProcess.create({
      project_id: req.params.projectId,
      step_name,
      description,
      cost,
      time_required,
      material_used,
    });
    res.status(201).json(process);
  } catch (error) {
    console.error('Error creating casting process:', error);
    res.status(500).json({ error: 'Failed to create casting process' });
  }
});

// Update an existing casting process
router.put('/casting-processes/:id', authenticate, async (req, res) => {
  try {
    const process = await CastingProcess.findByPk(req.params.id);
    if (process) {
      await process.update(req.body);
      res.json(process);
    } else {
      res.status(404).json({ error: 'Casting process not found' });
    }
  } catch (error) {
    console.error('Error updating casting process:', error);
    res.status(500).json({ error: 'Failed to update casting process' });
  }
});

// Delete a casting process
router.delete('/casting-processes/:id', authenticate, async (req, res) => {
  try {
    const process = await CastingProcess.findByPk(req.params.id);
    if (process) {
      await process.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Casting process not found' });
    }
  } catch (error) {
    console.error('Error deleting casting process:', error);
    res.status(500).json({ error: 'Failed to delete casting process' });
  }
});

// Summary endpoint
router.get('/summary', authenticate, async (req, res) => {
  try {
    const artistsCount = await Artist.count();
    const projectsCount = await Project.count();
    const castingProcessesCount = await CastingProcess.count();
    
    res.json({ artistsCount, projectsCount, castingProcessesCount });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});


module.exports = router;
