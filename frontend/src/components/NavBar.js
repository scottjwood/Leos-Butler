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
        {user ? (
          <>
            <li>Welcome, {user.username}</li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            {/* Remove the Notifications link */}
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
