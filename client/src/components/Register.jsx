import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme();

export function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate inputs
    if (!username || !email || !password || !aadhar || !phone) {
      setError('All fields are required.');
      return;
    }

    // Check if Aadhar and Phone are numbers
    if (!/^\d+$/.test(aadhar) || !/^\d+$/.test(phone)) {
      setError('Aadhar and Phone must be valid numbers.');
      return;
    }

    try {
      // Make POST request using axios to the backend API for registration
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        aadhar,
        phone,
        plasticHistory: [],  // Optional: You can pass plasticHistory here if needed
      });

      setSuccessMessage('Registration successful! Redirecting to login...');
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/api/auth/login');  // Ensure '/login' is the correct route for your login page
      }, 2000);
    } catch (err) {
      // Handle error and set error message
      setError(err.response?.data?.msg || 'Registration failed');
      console.error('Registration error:', err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          backgroundImage: 'url(/background.jpg)', // Adjust the path as needed
          backgroundSize: 'cover',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={6}
          style={{
            padding: '30px',
            textAlign: 'center',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" align="center" style={{ marginBottom: '20px' }}>
            Sign Up
          </Typography>
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          {successMessage && <Typography color="primary" variant="body2">{successMessage}</Typography>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="aadhar"
              label="Aadhar Number"
              name="aadhar"
              autoComplete="aadhar"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              style={{ marginBottom: '20px' }}
              type="text"  // Use text input to allow full 12 digits
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ marginBottom: '20px' }}
              type="text"  // Use text input to allow full number entry
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: '#4CAF50' }}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
