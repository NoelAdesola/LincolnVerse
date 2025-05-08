// src/pages/MediaDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMediaDetails, addFavorite } from '../services/api';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  CardMedia,
  Alert
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const MediaDetail = ({ user }) => {
  const { type, id } = useParams();
  const navigate     = useNavigate();

  const [media,     setMedia]     = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');
  const [favorited, setFavorited] = useState(false);

  // Fetch media details on mount
  useEffect(() => {
    setLoading(true);
    getMediaDetails(type, id)
      .then(res => {
        setMedia(res.data);
        setError('');
      })
      .catch(() => setError('Failed to load media details.'))
      .finally(() => setLoading(false));
  }, [type, id]);

  // Download handler
  const handleDownload = async () => {
    try {
      const resp = await fetch(media.url, { mode: 'cors' });
      const blob = await resp.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      const ext   = media.url.match(/\.\w+$/)?.[0] || '';
      a.download = (media.title || id).replace(/\s+/g,'_') + ext;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError('Download failed.');
    }
  };

  // Favorite handler
  const handleFavorite = async () => {
    if (!user) {
      setError('Please log in to add favorites.');
      return;
    }
    try {
      await addFavorite({
        media_id:      media.id,
        media_type:    type,
        title:         media.title,
        thumbnail_url: media.thumbnail || media.url,
        url:           media.url
      });
      setFavorited(true);
    } catch {
      setError('Could not add to favorites.');
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Box mt={2}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box mb={3}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          ← Back to results
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>
        {media.title || 'Untitled'}
      </Typography>
      {media.creator_display_name && (
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          By {media.creator_display_name}
        </Typography>
      )}

      <CardMedia
        component={type === 'audio' ? 'audio' : type === 'video' ? 'video' : 'img'}
        src={media.url}
        controls={type !== 'images'}
        alt={media.title}
        sx={{
          width: '100%',
          maxHeight: 600,
          objectFit: 'contain',
          mb: 2
        }}
      />

      <Box display="flex" gap={2} mb={2}>
        <Button variant="contained" onClick={handleDownload}>
          Download
        </Button>
        <Button
          variant={favorited ? 'outlined' : 'contained'}
          color="secondary"
          startIcon={favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          onClick={handleFavorite}
        >
          {favorited ? 'Favorited' : 'Add to Favorites'}
        </Button>
      </Box>

      {media.description && (
        <Typography paragraph>
          {media.description}
        </Typography>
      )}
    </Container>
  );
};

export default MediaDetail;
