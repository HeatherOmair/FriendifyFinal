import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import '../CSS/SignInPage.css'; // Import custom CSS
import AnimatedWrapper from '../components/AnimatedWrapper'; // Assuming AnimatedWrapper is your animation component
import Ball from '../components/Ball'; // Assuming Ball is for your custom cursor
import useFetch from '../hooks/useFetch'; // Import custom hook

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between SignIn and SignUp
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if the form is submitting
  const { data, loading, error: fetchError, fetchData } = useFetch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsSubmitting(true); // Mark as submitting to trigger fetch
      setError(''); // Clear any previous errors
    } else {
      setError('Please fill in both username and password.');
    }
  };

  // Trigger fetch only when submitClicked state changes and form is valid
  useEffect(() => {
    if (isSubmitting && !loading) {
      fetchData(
        `http://localhost:5000/api/auth/${isSignUp ? 'register' : 'login'}`,
        'POST',
        { username, password }
      );
    }
  }, [isSubmitting, username, password, isSignUp, fetchData, loading]);

  useEffect(() => {
    if (fetchError) {
      setError(fetchError || 'An error occurred'); // Show error if fetch fails
      setIsSubmitting(false); // Stop submitting after error
    }
  }, [fetchError]);

  useEffect(() => {
    if (data && data.token) {
      localStorage.setItem('authToken', data.token); // Store the token
      window.location.href = '/feed'; // Redirect to feed after successful login/signup
    }
  }, [data]);

  // Handle click on "Don't have an account? Sign Up" or "Already have an account? Sign In"
  const handleSwitchForm = () => {
    setIsSignUp((prev) => !prev);
    setError(''); // Clear the error when switching forms
    setUsername(''); // Clear the username and password fields
    setPassword('');
    setIsSubmitting(false); // Reset submitting state when switching forms
  };

  return (
    <div className="wrapper">
      <div className="left-side">
        <AnimatedWrapper />
      </div>

      <div className="form-container">
        <Box className="form-wrapper">
          <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <Box className="control">
              <div className="block-cube">
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
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
              {loading ? (isSignUp ? 'Signing Up...' : 'Logging in...') : (isSignUp ? 'Sign Up' : 'Log In')}
            </Button>
          </form>

          {/* Toggle between SignIn and SignUp */}
          <div className="switch-form">
            <button
              className="switch-btn"
              onClick={handleSwitchForm} // Switch between Sign In and Sign Up
              style={{
                fontFamily: 'monospace', // Ensure it matches the site theme
                color: '#fff',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '10px 0',
                letterSpacing: '0.1em',
                fontSize: '16px',
                textDecoration: 'underline',
                transition: 'color 0.3s ease', // Smooth color transition
              }}
              onMouseEnter={(e) => e.target.style.color = 'rgba(0, 212, 255, 1)'} // Hover color effect
              onMouseLeave={(e) => e.target.style.color = '#fff'} // Reset color when not hovering
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </Box>

        {/* Ball Cursor */}
        <Ball borderColor="rgba(0, 212, 255, 1)" />
      </div>
    </div>
  );
};

export default SignInPage;
