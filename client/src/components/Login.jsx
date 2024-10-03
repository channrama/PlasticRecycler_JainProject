// frontend/src/components/Login.jsx
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
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });

      // Save the token (JWT)
      const token = response.data.token;
      localStorage.setItem('authToken', token);

      // Optionally, store user details in localStorage
      const userDetails = response.data.user;
      localStorage.setItem('userDetails', JSON.stringify(userDetails));

      // Redirect to main page after successful login
      navigate('/'); // Adjust the path as necessary
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.msg); // Set error message from server
      } else {
        setError('Server error, please try again later.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Log In</button>
        </form>
        <p style={styles.registerText}>
          New user? <span style={styles.registerLink} onClick={() => navigate('/api/auth/register')}>Register</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '4px',
    border: '1px solid #dbdbdb',
    width: '350px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid #dbdbdb',
    fontSize: '14px',
    backgroundColor: '#fafafa',
    outline: 'none',
  },
  button: {
    padding: '12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    marginTop: '15px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    fontSize: '12px',
  },
  registerText: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666',
  },
  registerLink: {
    color: '#28a745',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Login;
