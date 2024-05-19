import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/artists">Artists</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/storage-locations">Storage Locations</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
