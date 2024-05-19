const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/auth');
const { Artist, Project, StorageLocation, CastingProcess, User, Notification } = require('../models/db');

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

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Register route
router.post('/register', async (req, res) => {
  console.log(req.body); // Log the request body for debugging
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword, role });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Create a new project with notification
router.post('/projects', async (req, res) => {
  try {
    const { title, description, artist_id, mold_tracking_number, casting_cost, casting_time, material_usage, storage_location } = req.body;
    const project = await Project.create({ title, description, artist_id, mold_tracking_number, casting_cost, casting_time, material_usage, storage_location });

    // Create a notification for the user
    await Notification.create({
      user_id: req.user.id,
      message: `New project "${title}" created.`
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Get notifications for the logged-in user
router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { user_id: req.user.id } });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Mark a notification as read
router.put('/notifications/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (notification && notification.user_id === req.user.id) {
      notification.read = true;
      await notification.save();
      res.json(notification);
    } else {
      res.status(404).json({ error: 'Notification not found' });
    }
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

// Artist Report
router.get('/reports/artists', async (req, res) => {
  try {
    const artistReport = await sequelize.query(
      `SELECT a.name as artist, COUNT(p.id) as totalProjects, SUM(p.casting_cost) as totalCost 
       FROM Artists a
       LEFT JOIN Projects p ON a.id = p.artist_id
       GROUP BY a.name`,
      { type: sequelize.QueryTypes.SELECT }
    );
    res.json(artistReport);
  } catch (error) {
    console.error('Error fetching artist report:', error);
    res.status(500).json({ error: 'Failed to fetch artist report' });
  }
});

// Project Report
router.get('/reports/projects', async (req, res) => {
  try {
    const projectReport = await sequelize.query(
      `SELECT p.title as project, a.name as artist, SUM(cp.cost) as totalCost, SUM(cp.time_required) as totalTime 
       FROM Projects p
       LEFT JOIN Artists a ON p.artist_id = a.id
       LEFT JOIN CastingProcesses cp ON p.id = cp.project_id
       GROUP BY p.title, a.name`,
      { type: sequelize.QueryTypes.SELECT }
    );
    res.json(projectReport);
  } catch (error) {
    console.error('Error fetching project report:', error);
    res.status(500).json({ error: 'Failed to fetch project report' });
  }
});

// Casting Process Report
router.get('/reports/casting-processes', async (req, res) => {
  try {
    const castingProcessReport = await sequelize.query(
      `SELECT cp.step_name as step, p.title as project, SUM(cp.cost) as totalCost, SUM(cp.time_required) as totalTime, SUM(cp.material_used) as materialUsed
       FROM CastingProcesses cp
       LEFT JOIN Projects p ON cp.project_id = p.id
       GROUP BY cp.step_name, p.title`,
      { type: sequelize.QueryTypes.SELECT }
    );
    res.json(castingProcessReport);
  } catch (error) {
    console.error('Error fetching casting process report:', error);
    res.status(500).json({ error: 'Failed to fetch casting process report' });
  }
});

// Get user profile
router.get('/user', async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'role']
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Change user password
router.post('/user/change-password', async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    if (user && await bcrypt.compare(oldPassword, user.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      res.json({ message: 'Password changed successfully' });
    } else {
      res.status(400).json({ error: 'Old password is incorrect' });
    }
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// Get all casting processes for a project
router.get('/projects/:projectId/casting-processes', async (req, res) => {
  try {
    const processes = await CastingProcess.findAll({ where: { project_id: req.params.projectId } });
    res.json(processes);
  } catch (error) {
    console.error('Error fetching casting processes:', error);
    res.status(500).json({ error: 'Failed to fetch casting processes' });
  }
});

// Get a single casting process by ID
router.get('/casting-processes/:id', async (req, res) => {
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
router.post('/projects/:projectId/casting-processes', async (req, res) => {
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
router.put('/casting-processes/:id', async (req, res) => {
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
router.delete('/casting-processes/:id', async (req, res) => {
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
router.get('/summary', async (req, res) => {
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
