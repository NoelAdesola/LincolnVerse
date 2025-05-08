// src/pages/NotFound.js
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const NotFound = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = e => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length >= 3) {
      // Redirect to Home with a ?q=yourSearch parameter
      navigate(`/?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <Container sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        The page you are looking for doesn’t exist or has been moved.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          maxWidth: 400,
          mx: 'auto',
          display: 'flex',
          gap: 1,
          mb: 4
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search media..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={query.trim().length < 3}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button component={RouterLink} to="/" variant="outlined">
          Go Home
        </Button>
        <Button component={RouterLink} to="/contact" variant="contained">
          Contact Support
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
