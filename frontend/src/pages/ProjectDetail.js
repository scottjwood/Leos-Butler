import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        const data = await response.json();
        console.log('Fetched project:', data);
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Failed to fetch project');
      }
    };

    fetchProject();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!project) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-4">{project.title}</h1>
      <p>{project.description}</p>
      <p>Mold Tracking Number: {project.mold_tracking_number}</p>
      <p>Casting Cost: {project.casting_cost}</p>
      <p>Casting Time: {project.casting_time}</p>
      <p>Material Usage: {project.material_usage}</p>
      <p>Storage Location: {project.storage_location}</p>
    </div>
  );
};

export default ProjectDetail;
