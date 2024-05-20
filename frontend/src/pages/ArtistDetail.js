import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-4">{artist.name}</h1>
      <p>{artist.contact_details}</p>
      <h2 className="text-2xl mt-6 mb-4">Projects</h2>
      {projects && projects.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link to={`/projects/${project.id}`} className="text-xl text-primary hover:underline"><li key={project.id} className="bg-card p-4 shadow rounded">
              {project.title}
              <p>{project.description}</p>
            </li></Link>
          ))}
        </ul>
      ) : (
        <p>No projects found for this artist.</p>
      )}
    </div>
  );
};

export default ArtistDetail;
