import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/artists/${id}`);
        const data = await response.json();
        if (response.ok) {
          setArtist(data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error fetching artist:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!artist) return <div>Artist not found</div>;

  return (
    <div>
      <h1>{artist.name}</h1>
      <p>{artist.contact_details}</p>
      <Link to={`/artists/${id}/edit`}>Edit Artist</Link>
    </div>
  );
};

export default ArtistDetail;
