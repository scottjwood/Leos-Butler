// /frontend/src/pages/ArtistDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/artists/${id}`);
        const data = await response.json();
        setArtist(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!artist) {
    return <div>Artist not found</div>;
  }

  return (
    <div>
      <h1>{artist.name}</h1>
      <p>{artist.contact_details}</p>
    </div>
  );
};

export default ArtistDetail;
