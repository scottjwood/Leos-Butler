import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/artists/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArtist(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch artist. Please try again later.</div>;

  return (
    <div>
      <h1>{artist.name}</h1>
      <p>{artist.description}</p>
      {/* Render other artist details here */}
    </div>
  );
};

export default ArtistDetail;
