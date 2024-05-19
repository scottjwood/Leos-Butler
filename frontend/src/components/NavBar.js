import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/artists">Artists</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/storage-map">Storage Map</Link>
      <Link to="/dashboard">Dashboard</Link>
      {user ? (
        <span>Welcome, {user.username}</span>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
