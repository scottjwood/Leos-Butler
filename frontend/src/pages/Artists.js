import React, { useEffect, useState } from 'react';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/artists');
        if (!response.ok) {
          throw new Error('Failed to fetch artists');
        }
        const data = await response.json();
        console.log('Fetched artists:', data);
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setError('Failed to fetch artists');
      }
    };

    fetchArtists();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Artists</h2>
      <ul>
        {Array.isArray(artists) && artists.length > 0 ? (
          artists.map((artist) => (
            <li key={artist.id}>{artist.name}</li>
          ))
        ) : (
          <p>No artists found.</p>
        )}
      </ul>
    </div>
  );
};

export default Artists;
