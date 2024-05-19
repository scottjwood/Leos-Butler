import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const StorageLocationDetail = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/storage-locations/${id}`);
        const data = await response.json();
        if (response.ok) {
          setLocation(data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error fetching storage location:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!location) return <div>Storage location not found</div>;

  return (
    <div>
      <h1>{location.name}</h1>
      <p>{location.description}</p>
      <p>Capacity: {location.capacity}</p>
      <Link to={`/storage-locations/${id}/edit`}>Edit Storage Location</Link>
    </div>
  );
};

export default StorageLocationDetail;
