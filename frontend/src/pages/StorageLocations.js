import React, { useEffect, useState } from 'react';

const StorageLocations = () => {
  const [storageLocations, setStorageLocations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStorageLocations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/storage-locations');
        if (!response.ok) {
          throw new Error('Failed to fetch storage locations');
        }
        const data = await response.json();
        console.log('Fetched storage locations:', data);
        setStorageLocations(data);
      } catch (error) {
        console.error('Error fetching storage locations:', error);
        setError('Failed to fetch storage locations');
      }
    };

    fetchStorageLocations();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Storage Locations</h2>
      <ul>
        {Array.isArray(storageLocations) && storageLocations.length > 0 ? (
          storageLocations.map((location) => (
            <li key={location.id}>{location.name}</li>
          ))
        ) : (
          <p>No storage locations found.</p>
        )}
      </ul>
    </div>
  );
};

export default StorageLocations;
