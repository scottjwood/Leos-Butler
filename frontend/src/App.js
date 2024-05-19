import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/artists" element={<Artists />} />
        <Route path="/artists/new" element={<ArtistForm />} />
        <Route path="/artists/:id" element={<ArtistDetail />} />
        <Route path="/artists/:id/edit" element={<ArtistForm />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<ProjectForm />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/projects/:id/edit" element={<ProjectForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/storage-locations" element={<StorageLocations />} />
        <Route path="/storage-locations/new" element={<StorageLocationForm />} />
        <Route path="/storage-locations/:id" element={<StorageLocationDetail />} />
        <Route path="/storage-locations/:id/edit" element={<StorageLocationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
