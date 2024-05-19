import React, { useEffect, useState } from 'react';

const StorageMap = () => {
  const [locations, setLocations] = useState([]);
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
      }
    };

    fetchLocations();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Storage Map</h1>
      <div className="storage-map">
        {locations.map((location) => (
          <div key={location.id} className="storage-location">
            <p>{location.name}</p>
            <p>{location.description}</p>
            <p>Capacity: {location.capacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorageMap;
