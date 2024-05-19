import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CastingProcessDetail = () => {
  const { id } = useParams();
  const [process, setProcess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcess = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/casting-processes/${id}`);
        const data = await response.json();
        if (response.ok) {
          setProcess(data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error fetching casting process:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProcess();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!process) return <div>Casting process not found</div>;

  return (
    <div>
      <h1>{process.step_name}</h1>
      <p>{process.description}</p>
      <p>Cost: {process.cost}</p>
      <p>Time Required: {process.time_required}</p>
      <p>Material Used: {process.material_used}</p>
      <Link to={`/casting-processes/${id}/edit`}>Edit Casting Process</Link>
    </div>
  );
};

export default CastingProcessDetail;
