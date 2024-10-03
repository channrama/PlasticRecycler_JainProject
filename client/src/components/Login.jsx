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

      // Save the token in localStorage
      const token = response.data.token;
      localStorage.setItem('authToken', token); // Save JWT in localStorage

      // Optionally, store user details in localStorage or state for later use
      const userDetails = response.data.user;
      localStorage.setItem('userDetails', JSON.stringify(userDetails)); // Save user details

      // Redirect to main page after successful login
      navigate('/');  // Assuming "/" is the route for main.jsx
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
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
          style={styles.input} // Optional: add styles
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          style={styles.input} // Optional: add styles
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

// Optional: Styles for better UI
const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
};

export default Login;
