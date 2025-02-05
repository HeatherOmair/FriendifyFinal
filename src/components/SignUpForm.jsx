import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import useFetch from '../hooks/useFetch'; // Import useFetch

const SignUpForm = ({ onSignupSuccess, onSignupFailure }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // useFetch hook to manage API calls
  const { data, loading, error: fetchError, fetchData } = useFetch();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log('Form submit handler fired'); // Log to confirm if it's triggered
    setError(''); // Clear previous errors

    // Validate input
    if (!username || !password) {
      setError('Please fill in both username and password.');
      return;
    }

    // Log validation passed
    console.log('Validation passed, making API request...');
    
    // Make the request to sign up
    fetchData('http://localhost:5000/api/auth/register', 'POST', { username, password });
  };

  useEffect(() => {
    // Handle errors from fetch
    if (fetchError) {
      console.log('Fetch error:', fetchError); // Log fetch error
      setError(fetchError || 'An error occurred during registration');
      onSignupFailure(fetchError || 'An error occurred during registration');
    }
  }, [fetchError, onSignupFailure]);

  useEffect(() => {
    if (data && data.token) {
      console.log('Sign-up successful:', data); // Log response data
      localStorage.setItem('authToken', data.token);
      onSignupSuccess(data.token);
    }
  }, [data, onSignupSuccess]);
  

  return (
    <Box className="form-wrapper">
      <h1>Sign Up</h1>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <Box className="control">
          <div className="block-cube">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: 'transparent',
                  color: '#fff',
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                },
              }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
            />
          </div>
        </Box>

        {/* Password Field */}
        <Box className="control">
          <div className="block-cube">
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: 'transparent',
                  color: '#fff',
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                },
              }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
            />
          </div>
        </Box>

        {/* Submit Button */}
        <Button
          className="btn"
          type="submit"
          fullWidth
          variant="outlined"
          sx={{
            padding: '14px 16px',
            color: '#fff',
            letterSpacing: '0.1em',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            fontSize: '16px',
            position: 'relative',
            overflow: 'hidden',
            borderColor: '#fff',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderColor: '#fff',
            },
          }}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Registering...' : 'Sign Up'}
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
