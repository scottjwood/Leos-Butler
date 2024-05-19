// /frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Artists from './pages/Artists';
import ArtistDetail from './pages/ArtistDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/artists" element={<Artists />} />
        <Route path="/artists/:id" element={<ArtistDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
