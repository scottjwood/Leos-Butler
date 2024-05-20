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
        setStorageLocations(data);
      } catch (error) {
        console.error('Error fetching storage locations:', error);
        setError('Failed to fetch storage locations');
      }
    };

    fetchStorageLocations();
  }, []);

  const fetchProjects = async (locationId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/storage-locations/${locationId}/projects`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to fetch projects');
      return [];
    }
  };

  const [projectsByLocation, setProjectsByLocation] = useState({});

  useEffect(() => {
    const loadProjects = async () => {
      const projectsData = {};
      for (const location of storageLocations) {
        projectsData[location.id] = await fetchProjects(location.id);
      }
      setProjectsByLocation(projectsData);
    };
    if (storageLocations.length > 0) {
      loadProjects();
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
              {projectsByLocation[location.id] && projectsByLocation[location.id].map(project => (
                <li key={project.id}>
                  <a href={`/projects/${project.id}`}>{project.title}</a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StorageLocations;
