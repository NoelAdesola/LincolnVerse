// src/components/FeatureCategories.js
import React from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VideocamIcon from '@mui/icons-material/Videocam';
import BrushIcon from '@mui/icons-material/Brush';

const categories = [
  { key: 'images',    label: 'Images',        icon: <ImageIcon fontSize="large" />,       color: '#5e8bff' },
  { key: 'audio',     label: 'Audio',         icon: <AudiotrackIcon fontSize="large" />,  color: '#5ad4a6' },
  { key: 'video',     label: 'Video',         icon: <VideocamIcon fontSize="large" />,    color: '#ffb470' },
  { key: 'illustrations', label: 'Illustrations', icon: <BrushIcon fontSize="large" />,   color: '#ff6b6b' },
];

const FeatureCategories = ({ onSelect }) => (
  <Box sx={{ py: 4 }}>
    <Typography variant="h4" align="center" gutterBottom>
      Browse by Category
    </Typography>
    <Grid container spacing={3} justifyContent="center">
      {categories.map(cat => (
        <Grid item xs={6} sm={3} key={cat.key}>
          <Card>
            <CardActionArea
              onClick={() => onSelect(cat.key)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 4,
                bgcolor: cat.color,
                color: '#fff',
                '&:hover': { opacity: 0.9 }
              }}
            >
              {cat.icon}
              <CardContent>
                <Typography variant="h6">{cat.label}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default FeatureCategories;
