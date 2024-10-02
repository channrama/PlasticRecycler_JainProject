import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [adhar, setAdhar] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email);
    console.log('Adhar:', adhar);
    console.log('Phone:', phone);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container 
        component="main" 
        maxWidth="xs" 
        style={{ 
          backgroundImage: 'url(/background.jpg)', 
          backgroundSize: 'cover', 
          height: '100vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
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
            alignItems: 'center' 
          }}
        >
          <Typography component="h1" variant="h5" align="center" style={{ marginBottom: '20px' }}>
            Sign Up
          </Typography>
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
              id="adhar"
              label="Adhar Number"
              name="adhar"
              autoComplete="adhar"
              value={adhar}
              onChange={(e) => setAdhar(e.target.value)}
              style={{ marginBottom: '20px' }}
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