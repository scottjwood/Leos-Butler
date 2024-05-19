// /frontend/src/pages/Artists.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/artists');
        const data = await response.json();
        console.log('Fetched artists:', data);
        setArtists(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Artists</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Artists;
