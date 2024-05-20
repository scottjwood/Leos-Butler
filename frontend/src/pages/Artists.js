import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Artists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await fetch('http://localhost:5000/api/artists');
      const data = await response.json();
      setArtists(data);
    };
    fetchArtists();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-6">Artists</h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist) => (
          <li key={artist.id} className="bg-card p-4 shadow rounded">
            <Link to={`/artists/${artist.id}`} className="text-primary text-2xl hover:underline">{artist.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/artists/new" className="block mt-6 text-secondary hover:underline">Add New Artist</Link>
    </div>
  );
};

export default Artists;
