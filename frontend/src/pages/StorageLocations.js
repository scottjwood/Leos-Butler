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
    <div className="container mx-auto p-4">
      <h2 className="text-4xl mb-4">Storage Locations</h2>
      <ul className="pl-5">
        {storageLocations.map(location => (
          <li key={location.id} className="mb-4">
            <h3 className="text-2xl">{location.name}</h3>
            
            <h4 className="text-lg mt-2">Projects</h4>
            <ul className="list-disc pl-5">
              {projectsByLocation[location.id] && projectsByLocation[location.id].length > 0 ? (
                projectsByLocation[location.id].map(project => (
                  <li key={project.id}>
                    <a href={`/projects/${project.id}`} className="text-base">{project.title}</a>
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
