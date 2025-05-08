import React, {useState, useEffect} from 'react';
import { getFavorites, removeFavorite } from '../services/api';
import {
  Grid, Card, CardMedia, CardContent,
  Typography, IconButton, Container
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Favorites = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getFavorites().then(r=>setItems(r.data));
  }, []);
  const onRemove = async id => {
    await removeFavorite(id);
    setItems(items.filter(i=>i.id!==id));
  };
  return (
    <Container sx={{py:4}}>
      <Typography variant="h4" gutterBottom>My Favorites</Typography>
      <Grid container spacing={2}>
        {items.map(f => (
          <Grid item key={f.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height={140}
                image={f.thumbnail}
                alt={f.title}
              />
              <CardContent sx={{ display:'flex', justifyContent:'space-between' }}>
                <Typography variant="subtitle1">{f.title}</Typography>
                <IconButton onClick={()=>onRemove(f.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;
