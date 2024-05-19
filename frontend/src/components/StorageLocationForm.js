import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const StorageLocationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchLocation = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/storage-locations/${id}`);
          const data = await response.json();
          if (response.ok) {
            setName(data.name);
            setDescription(data.description);
            setCapacity(data.capacity);
          } else {
            throw new Error(data.error);
          }
        } catch (error) {
          console.error('Error fetching storage location:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchLocation();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const locationData = { name, description, capacity };
    try {
      const response = id 
        ? await fetch(`http://localhost:5000/api/storage-locations/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(locationData),
          })
        : await fetch('http://localhost:5000/api/storage-locations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(locationData),
          });

      if (response.ok) {
        navigate('/storage-locations');
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error saving storage location:', error);
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Capacity</label>
        <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
      </div>
      <button type="submit">{id ? 'Update' : 'Create'} Storage Location</button>
    </form>
  );
};

export default StorageLocationForm;
