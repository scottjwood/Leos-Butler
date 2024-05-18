import React, { useState } from 'react';

const ArtistForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [contactDetails, setContactDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/artists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, contactDetails }),
    });
    const artist = await response.json();
    onAdd(artist);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Contact Details</label>
        <textarea
          value={contactDetails}
          onChange={(e) => setContactDetails(e.target.value)}
        />
      </div>
      <button type="submit">Add Artist</button>
    </form>
  );
};

export default ArtistForm;
