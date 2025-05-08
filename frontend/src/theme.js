// src/theme.js
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5e8bff',      // Soft blue (still used e.g. AppBar text)
      contrastText: '#fff',
    },
    secondary: {
      main: '#5ad4a6',      // Mint green (we’ll use this for Sign Up)
      contrastText: '#fff',
    },
    // additional semantic colors
    error:   { main: '#ff6b6b' },
    warning: { main: '#ffbe40' },
    info:    { main: '#64c4ff' },
    success: { main: '#67d4a8' },
    background: {
      default: '#f8f9fe',
      paper:   '#ffffff',
    },
    text: {
      primary:   '#323259',
      secondary: '#656693',
      hint:      '#9b9dcb',
    },
  },

  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    button: {
      textTransform: 'none',  // no ALL-CAPS
      fontWeight:    500,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding:     '8px 16px',
          transition:  'all 0.2s ease-in-out',
          '&:hover': {
            transform:    'translateY(-2px)',
            boxShadow:    '0px 8px 16px rgba(94,139,255,0.2)',
          },
        },
        // change the "primary contained" style to mint-green gradient
        containedPrimary: {
          background: 'linear-gradient(135deg, #5ad4a6 0%, #39a47d 100%)',
        },
      },
    },
  },
});

// make your typography responsive
theme = responsiveFontSizes(theme);

export default theme;
