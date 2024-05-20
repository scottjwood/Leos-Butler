import React, { useEffect, useState } from 'react';

const StorageLocations = () => {
  const [storageLocations, setStorageLocations] = useState([]);
  const [error, setError] = useState('');
  const [projectsByLocation, setProjectsByLocation] = useState({});

  useEffect(() => {
    const fetchStorageLocations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/storage-locations');
        if (!response.ok) {
          throw new Error('Failed to fetch storage locations');
        }
        const data = await response.json();
        console.log('Storage locations:', data); // Add this line
        setStorageLocations(data);
      } catch (error) {
        console.error('Error fetching storage locations:', error);
        setError('Failed to fetch storage locations');
      }
    };

    fetchStorageLocations();
  }, []);

  useEffect(() => {
    const fetchProjects = async (locationId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/storage-locations/${locationId}/projects`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        console.log(`Projects for storage location ${locationId}:`, data); // Add this line
        setProjectsByLocation(prevState => ({ ...prevState, [locationId]: data }));
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to fetch projects');
      }
    };

    if (storageLocations.length > 0) {
      storageLocations.forEach(location => fetchProjects(location.id));
    }
  }, [storageLocations]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Storage Locations</h2>
      <ul>
        {storageLocations.map(location => (
          <li key={location.id}>
            <h3>{location.name}</h3>
            <p>{location.description}</p>
            <h4>Projects</h4>
            <ul>
              {projectsByLocation[location.id] && projectsByLocation[location.id].length > 0 ? (
                projectsByLocation[location.id].map(project => (
                  <li key={project.id}>
                    <a href={`/projects/${project.id}`}>{project.title}</a>
                  </li>
                ))
              ) : (
                <li>No projects found</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StorageLocations;
