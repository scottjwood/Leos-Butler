import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${id}`);
        const data = await response.json();
        if (response.ok) {
          setProject(data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p>{project.mold_tracking_number}</p>
      <p>{project.casting_cost}</p>
      <p>{project.casting_time}</p>
      <p>{project.material_usage}</p>
      <p>{project.storage_location}</p>
      <Link to={`/projects/${id}/edit`}>Edit Project</Link>
    </div>
  );
};

export default ProjectDetail;
