import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch'; // Import the custom useFetch hook

const FeedPage = () => {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token'); // Get token from localStorage

  // Fetch protected data using the useFetch hook
  const { data, loading, error } = useFetch(
    'http://localhost:5000/api/protected', 
    'GET', 
    null, 
    { Authorization: `Bearer ${token}` }  // Sending the token in headers
  );

  useEffect(() => {
    if (data) {
      setMessage(data.message);  // Set message from response
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error.message}</p>;
  }

  return (
    <div>
      <h1>Feed Page</h1>
      <p>{message}</p>
    </div>
  );
};

export default FeedPage;
