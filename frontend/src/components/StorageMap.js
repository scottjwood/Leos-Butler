import React, { useEffect, useState } from 'react';
import './StorageMap.css';

const StorageMap = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

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

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Storage Map</h1>
      <div className="storage-map">
        {locations.map((location) => (
          <div
            key={location.id}
            className={`storage-location ${location.capacity === 0 ? 'full' : 'available'}`}
            onClick={() => handleLocationClick(location)}
          >
            <p>{location.name}</p>
          </div>
        ))}
      </div>
      {selectedLocation && (
        <div className="location-details">
          <h2>{selectedLocation.name}</h2>
          <p>{selectedLocation.description}</p>
          <p>Capacity: {selectedLocation.capacity}</p>
        </div>
      )}
    </div>
  );
};

export default StorageMap;
