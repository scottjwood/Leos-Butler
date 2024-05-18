// /frontend/src/components/ArtistList.js

import React from 'react';
import { Link } from 'react-router-dom';

const ArtistList = ({ artists }) => {
  return (
    <ul>
      {artists.map((artist) => (
        <li key={artist.id}>
          <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ArtistList;
