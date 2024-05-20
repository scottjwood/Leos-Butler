import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/artists/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch artist');
        }
        const data = await response.json();
        setArtist(data);
      } catch (error) {
        console.error('Error fetching artist:', error);
        setError('Failed to fetch artist');
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/artists/${id}/projects`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to fetch projects');
      }
    };

    fetchArtist();
    fetchProjects();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!artist) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{artist.name}</h2>
      <p>Contact Details: {artist.contact_details}</p>
      <h3>Projects</h3>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <a href={`/projects/${project.id}`}>{project.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistDetail;
