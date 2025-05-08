// src/pages/Home.js
import React, { useState, useMemo, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import debounce from 'lodash/debounce';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Switch,
  FormControlLabel,
  Backdrop,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ThreeBackground from '../components/ThreeBackground';
import { searchMedia } from '../services/api';

const Home = ({ user }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError]     = useState('');

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: { main: '#009688' }
      }
    }),
  [darkMode]);

  const runSearch = useCallback(async (q) => {
    const term = q.trim();
    if (!term) {
      setError('Please enter a search term.');
      return;
    }
    if (term.length < 3) {
      setError('Please enter at least 3 characters.');
      return;
    }
    setError('');
    setLoading(true);
    setSearched(true);

    try {
      const { data } = await searchMedia(term);
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      setError('Network error, please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useMemo(() => debounce(runSearch, 300), [runSearch]);

  const handleChange = e => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    debouncedSearch.cancel();
    runSearch(query);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThreeBackground style={{ position: 'fixed', inset: 0, zIndex: -1, opacity: 0.1 }} />

      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            LincolnVerse
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(dm => !dm)}
                color="default"
              />
            }
            label="Dark Mode"
            sx={{ color: 'inherit' }}
          />
          {user && (
            <Typography sx={{ ml: 2, color: 'inherit' }}>
              Hi, {user.username}
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
         {/* ← Introductory text */}
       <Typography variant="h3" gutterBottom>
         Welcome to LincolnVerse
       </Typography>
       <Typography
         variant="subtitle1"
         color="text.secondary"
         sx={{ mb: 3 }}
       >
         Your one-stop platform for searching and discovering openly-licensed media for creators, educators, and developers.
       </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search media..."
            value={query}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {searched && (
          <>
            {loading ? (
              <Backdrop open sx={{ color: '#fff', zIndex: theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : results.length ? (
              <Grid container spacing={2} sx={{ mt: 3 }}>
                {results.map(item => (
                  <Grid item key={item.id} xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%' }}>
                      <CardActionArea
                        component={RouterLink}
                        to={`/media/${item.asset_type || 'images'}/${item.id}`}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.thumbnail || item.url}
                          alt={item.title || 'Media'}
                          loading="lazy"
                        />
                        <CardContent>
                          <Typography variant="subtitle1" noWrap>
                            {item.title || 'Untitled'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {item.creator_display_name || 'Unknown'}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography sx={{ mt: 3 }}>
                No results found for “{query}”.
              </Typography>
            )}
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Home;
