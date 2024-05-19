import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ArtistForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchArtist = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/artists/${id}`);
          const data = await response.json();
          if (response.ok) {
            setName(data.name);
            setContactDetails(data.contact_details);
          } else {
            throw new Error(data.error);
          }
        } catch (error) {
          console.error('Error fetching artist:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchArtist();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const artistData = { name, contact_details: contactDetails };
    try {
      const response = id 
        ? await fetch(`http://localhost:5000/api/artists/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(artistData),
          })
        : await fetch('http://localhost:5000/api/artists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(artistData),
          });

      if (response.ok) {
        navigate('/artists');
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error saving artist:', error);
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
        <label>Contact Details</label>
        <input type="text" value={contactDetails} onChange={(e) => setContactDetails(e.target.value)} />
      </div>
      <button type="submit">{id ? 'Update' : 'Create'} Artist</button>
    </form>
  );
};

export default ArtistForm;
