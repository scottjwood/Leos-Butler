import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/artists');
        const data = await response.json();
        if (response.ok) {
          setArtists(Array.isArray(data) ? data : []);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    setFilteredArtists(
      artists.filter((artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, artists]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Artists</h1>
      <input
        type="text"
        placeholder="Search artists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredArtists.map((artist) => (
          <li key={artist.id}>
            <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/artists/new">Add Artist</Link>
    </div>
  );
};

export default Artists;
