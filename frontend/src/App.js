import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Artists from './pages/Artists';
import ArtistDetail from './pages/ArtistDetail';
import ArtistForm from './components/ArtistForm';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import ProjectForm from './components/ProjectForm';
import Login from './pages/Login';
import Register from './pages/Register';
import StorageLocations from './pages/StorageLocations';
import StorageLocationDetail from './pages/StorageLocationDetail';
import StorageLocationForm from './components/StorageLocationForm';
import StorageMap from './components/StorageMap';
import CastingProcesses from './pages/CastingProcesses';
import CastingProcessDetail from './pages/CastingProcessDetail';
import CastingProcessForm from './components/CastingProcessForm';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import UserSettings from './pages/UserSettings';
import ArtistReport from './pages/ArtistReport';
import ProjectReport from './pages/ProjectReport';
import CastingProcessReport from './pages/CastingProcessReport';
import Notifications from './components/Notifications';
import NavBar from './components/NavBar';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <NavBar user={user} />
      <Routes>
        <Route path="/artists" element={<Artists />} />
        <Route path="/artists/new" element={<ArtistForm />} />
        <Route path="/artists/:id" element={<ArtistDetail />} />
        <Route path="/artists/:id/edit" element={<ArtistForm />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<ProjectForm />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/projects/:id/edit" element={<ProjectForm />} />
        <Route path="/projects/:projectId/casting-processes" element={<CastingProcesses />} />
        <Route path="/projects/:projectId/casting-processes/new" element={<CastingProcessForm />} />
        <Route path="/casting-processes/:id" element={<CastingProcessDetail />} />
        <Route path="/casting-processes/:id/edit" element={<CastingProcessForm />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/storage-locations" element={<StorageLocations />} />
        <Route path="/storage-locations/new" element={<StorageLocationForm />} />
        <Route path="/storage-locations/:id" element={<StorageLocationDetail />} />
        <Route path="/storage-locations/:id/edit" element={<StorageLocationForm />} />
        <Route path="/storage-map" element={<StorageMap />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/reports/artists" element={<ArtistReport />} />
        <Route path="/reports/projects" element={<ProjectReport />} />
        <Route path="/reports/casting-processes" element={<CastingProcessReport />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
};

export default App;
