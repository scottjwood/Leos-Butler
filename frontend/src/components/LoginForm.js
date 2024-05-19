import React, { useState } from 'react';
import * as jwt_decode from 'jwt-decode';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        const data = await response.json();
        console.log('User logged in:', data);
        setMessage('User logged in successfully!');
        setError('');

        const decodedToken = jwt_decode(data.token);
        console.log('Decoded Token:', decodedToken);

        onLogin({ username: decodedToken.username, token: data.token });
      } else {
        const errorText = await response.text();
        console.log('Failed response:', errorText);
        setError('Failed to login');
        setMessage('');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('Failed to login');
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
