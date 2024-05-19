import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CastingProcesses = () => {
  const { projectId } = useParams();
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${projectId}/casting-processes`);
        const data = await response.json();
        if (response.ok) {
          setProcesses(Array.isArray(data) ? data : []);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error fetching casting processes:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProcesses();
  }, [projectId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Casting Processes</h1>
      <ul>
        {processes.map((process) => (
          <li key={process.id}>
            <Link to={`/casting-processes/${process.id}`}>{process.step_name}</Link>
          </li>
        ))}
      </ul>
      <Link to={`/projects/${projectId}/casting-processes/new`}>Add Casting Process</Link>
    </div>
  );
};

export default CastingProcesses;
