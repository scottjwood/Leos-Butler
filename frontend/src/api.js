// /frontend/src/api.js

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchArtists = async () => {
  const response = await fetch(`${API_BASE_URL}/artists`);
  return response.json();
};

export const fetchArtistById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/artists/${id}`);
  return response.json();
};
