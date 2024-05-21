import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await fetch('http://localhost:5000/api/artists');
      const data = await response.json();
      setArtists(data);
    };
    fetchArtists();
  }, []);

  const filteredArtists = artists
    .filter(artist =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-6">Artists</h1>
      <input
        type="text"
        placeholder="Search artists..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredArtists.map((artist) => (
          <Link 
            to={`/artists/${artist.id}`} 
            className="block bg-card p-4 shadow rounded text-primary text-base hover:no-underline hover:shadow-lg hover:bg-blue-100 transition-colors duration-200"
            key={artist.id}
          >
            {artist.name}
          </Link>
        ))}
      </ul>
      <Link to="/artists/new" className="mt-6 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add New Artist</Link>
    </div>
  );
};

export default Artists;