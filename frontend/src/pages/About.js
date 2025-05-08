// src/pages/About.js
import React from 'react';
import {
  Container,
  Box,
  Typography,
  Link as MuiLink,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CodeIcon from '@mui/icons-material/Code';

const About = () => (
  <Container sx={{ py: 4 }}>
    <Box>
      <Typography variant="h4" gutterBottom>
        About LincolnVerse
      </Typography>

      <Typography paragraph>
        LincolnVerse is a developer‐built web application for discovering and downloading
        open‐licensed media, powered by the Openverse API. It’s designed for creators,
        educators, and developers to find high‐quality images, audio, and video without
        worrying about copyright.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Features
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon><SearchIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Powerful media search" />
        </ListItem>
        <ListItem>
          <ListItemIcon><FilterListIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Advanced filtering by type, creator, and more" />
        </ListItem>
        <ListItem>
          <ListItemIcon><FavoriteIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Save your recent searches & favorites" />
        </ListItem>
        <ListItem>
          <ListItemIcon><CloudDownloadIcon color="primary" /></ListItemIcon>
          <ListItemText primary="One‐click download of full‐size assets" />
        </ListItem>
        <ListItem>
          <ListItemIcon><DarkModeIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Dark mode and accessibility options" />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Technology Stack
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon><CodeIcon /></ListItemIcon>
          <ListItemText primary="React" />
        </ListItem>
        <ListItem>
          <ListItemIcon><CodeIcon /></ListItemIcon>
          <ListItemText primary="Material-UI (MUI)" />
        </ListItem>
        <ListItem>
          <ListItemIcon><CodeIcon /></ListItemIcon>
          <ListItemText primary="Axios for HTTP" />
        </ListItem>
        <ListItem>
          <ListItemIcon><CodeIcon /></ListItemIcon>
          <ListItemText primary="Openverse API" />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Developer
      </Typography>
      <Typography paragraph>
        Built by Noel Adesola as part of the CMP9134 Software Engineering module at the
        University of Lincoln. Feel free to <MuiLink component={RouterLink} to="/contact">
        contact me</MuiLink> with any questions or feedback.
      </Typography>

      <Typography paragraph>
        Learn more about Openverse:&nbsp;
        <MuiLink href="https://wordpress.org/openverse/" target="_blank" rel="noopener">
          wordpress.org/openverse
        </MuiLink>
      </Typography>
    </Box>
  </Container>
);

export default About;
