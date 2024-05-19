import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Add CSS for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/artists">Artists</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/storage-map">Storage Map</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
