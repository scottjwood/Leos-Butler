import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-primary p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-lg font-bold">Foundry App</Link>
        <div>
          <Link to="/artists" className="ml-4 hover:underline">Artists</Link>
          <Link to="/projects" className="ml-4 hover:underline">Projects</Link>
          <Link to="/storage-locations" className="ml-4 hover:underline">Storage</Link>
          <Link to="/login" className="ml-4 hover:underline">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
