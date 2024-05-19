import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Artists from './pages/Artists';
import ArtistDetail from './pages/ArtistDetail';
import ArtistForm from './components/ArtistForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/artists" element={<Artists />} />
        <Route path="/artists/new" element={<ArtistForm />} />
        <Route path="/artists/:id" element={<ArtistDetail />} />
        <Route path="/artists/:id/edit" element={<ArtistForm />} />
      </Routes>
    </Router>
  );
}

export default App;
