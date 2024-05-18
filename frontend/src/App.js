import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Artists from './pages/Artists';
import ArtistDetail from './pages/ArtistDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Artists />} />
        <Route path="/artists/:id" element={<ArtistDetail />} />
      </Routes>
    </div>
  );
}

export default App;
