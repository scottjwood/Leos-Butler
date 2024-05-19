import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StorageLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/storage-locations');
        const data = await response.json();
        if (response.ok) {
          setLocations(Array.isArray(data) ? data : []);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error fetching storage locations:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Storage Locations</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <Link to={`/storage-locations/${location.id}`}>{location.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/storage-locations/new">Add Storage Location</Link>
    </div>
  );
};

export default StorageLocations;
