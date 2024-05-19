import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CastingProcessForm = () => {
  const { projectId, id } = useParams();
  const navigate = useNavigate();
  const [stepName, setStepName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [timeRequired, setTimeRequired] = useState('');
  const [materialUsed, setMaterialUsed] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProcess = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/casting-processes/${id}`);
          const data = await response.json();
          if (response.ok) {
            setStepName(data.step_name);
            setDescription(data.description);
            setCost(data.cost);
            setTimeRequired(data.time_required);
            setMaterialUsed(data.material_used);
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
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const processData = { step_name: stepName, description, cost, time_required: timeRequired, material_used: materialUsed };
    try {
      const response = id 
        ? await fetch(`http://localhost:5000/api/casting-processes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(processData),
          })
        : await fetch(`http://localhost:5000/api/projects/${projectId}/casting-processes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(processData),
          });

      if (response.ok) {
        navigate(`/projects/${projectId}/casting-processes`);
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error saving casting process:', error);
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Step Name</label>
        <input type="text" value={stepName} onChange={(e) => setStepName(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Cost</label>
        <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
      </div>
      <div>
        <label>Time Required</label>
        <input type="text" value={timeRequired} onChange={(e) => setTimeRequired(e.target.value)} />
      </div>
      <div>
        <label>Material Used</label>
        <input type="text" value={materialUsed} onChange={(e) => setMaterialUsed(e.target.value)} />
      </div>
      <button type="submit">{id ? 'Update' : 'Create'} Casting Process</button>
    </form>
  );
};

export default CastingProcessForm;
