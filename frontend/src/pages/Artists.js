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
    <div>
      <h1 className="text-3xl font-bold mb-4">Artists</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id} className="mb-2">
            <Link to={`/artists/${artist.id}`} className="text-blue-500 hover:underline">
              {artist.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/artists/new" className="text-green-500 hover:underline">
        Add New Artist
      </Link>
    </div>
  );
};

export default Artists;
