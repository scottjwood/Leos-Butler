import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [moldTrackingNumber, setMoldTrackingNumber] = useState('');
  const [castingCost, setCastingCost] = useState('');
  const [castingTime, setCastingTime] = useState('');
  const [materialUsage, setMaterialUsage] = useState('');
  const [storageLocation, setStorageLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/projects/${id}`);
          const data = await response.json();
          if (response.ok) {
            setTitle(data.title);
            setDescription(data.description);
            setMoldTrackingNumber(data.mold_tracking_number);
            setCastingCost(data.casting_cost);
            setCastingTime(data.casting_time);
            setMaterialUsage(data.material_usage);
            setStorageLocation(data.storage_location);
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
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      title,
      description,
      mold_tracking_number: moldTrackingNumber,
      casting_cost: castingCost,
      casting_time: castingTime,
      material_usage: materialUsage,
      storage_location: storageLocation
    };
    try {
      const response = id 
        ? await fetch(`http://localhost:5000/api/projects/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData),
          })
        : await fetch('http://localhost:5000/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData),
          });

      if (response.ok) {
        navigate('/projects');
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Mold Tracking Number</label>
        <input type="text" value={moldTrackingNumber} onChange={(e) => setMoldTrackingNumber(e.target.value)} />
      </div>
      <div>
        <label>Casting Cost</label>
        <input type="number" value={castingCost} onChange={(e) => setCastingCost(e.target.value)} />
      </div>
      <div>
        <label>Casting Time</label>
        <input type="text" value={castingTime} onChange={(e) => setCastingTime(e.target.value)} />
      </div>
      <div>
        <label>Material Usage</label>
        <input type="text" value={materialUsage} onChange={(e) => setMaterialUsage(e.target.value)} />
      </div>
      <div>
        <label>Storage Location</label>
        <input type="text" value={storageLocation} onChange={(e) => setStorageLocation(e.target.value)} />
      </div>
      <button type="submit">{id ? 'Update' : 'Create'} Project</button>
    </form>
  );
};

export default ProjectForm;
