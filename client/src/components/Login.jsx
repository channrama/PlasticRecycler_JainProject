import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Updated endpoint to match the backend route
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });

      
      // Save the token (can also use localStorage, sessionStorage, etc.)
      const token = response.data.token;
      localStorage.setItem('authToken', token); // Save JWT in localStorage

      // Optionally, store user details in localStorage or state for later use
      const userDetails = response.data.user;
      localStorage.setItem('userDetails', JSON.stringify(userDetails)); // Save user details

      // Redirect to main page after successful login
      navigate('/');  // Assuming "/main" is the route for main.jsx
    } catch (error) {
      // Handle errors more specifically
      if (error.response && error.response.status === 400) {
        setError(error.response.data.msg); // Set error message from server
      } else {
        setError('Server error, please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required // Add required attribute for better UX
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Add required attribute for better UX
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
