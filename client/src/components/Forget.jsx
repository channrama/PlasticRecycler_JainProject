import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export function Forget() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Email:', email);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ backgroundImage: 'url(/background.jpg)', backgroundSize: 'cover', height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Paper elevation={6} style={{ padding: '30px', textAlign: 'center', width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" style={{ marginBottom: '20px' }}>
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: '#4CAF50' }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}