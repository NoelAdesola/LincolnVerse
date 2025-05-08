// src/pages/Login.js
import React, { useState, useMemo } from "react";
import { loginUser } from "../services/api";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  useTheme,
  useMediaQuery,
  CssBaseline,
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Link as MuiLink,
  FormControlLabel,
  Checkbox,
  Switch,
  Backdrop,
  Fade,
  CircularProgress
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import ThreeBackground from '../components/ThreeBackground';

export default function Login({ setUser }) {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? 'dark' : 'light', primary: { main: '#009688' } } }),
    [darkMode]
  );

  const [formData, setFormData] = useState({ username: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (error) setError("");
  };
  const togglePassword = () => setShowPassword(prev => !prev);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Username and password are required.');
      return;
    }
    setLoading(true);
    setError("");
    try {
      await loginUser(formData);
      setUser({ username: formData.username });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || 'Sign in failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const muiTheme = useTheme();
  const isSmall = useMediaQuery(muiTheme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThreeBackground style={{ position: 'fixed', inset: 0, zIndex: -1, opacity: 0.1 }} />
      <Container maxWidth="xs">
        <Box mt={2} display="flex" justifyContent="flex-end">
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={() => setDarkMode(prev => !prev)} aria-label="Toggle dark mode" />}
            label="Dark Mode"
            sx={{ color: 'text.primary' }}
          />
        </Box>
        <Fade in timeout={600}>
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', borderTop: 4, borderColor: 'primary.main', position: 'relative' }}>
              {loading && (
                <Backdrop open sx={{ position: 'absolute', color: '#fff', zIndex: muiTheme.zIndex.drawer + 1 }}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
              <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 1, borderRadius: '50%', mb: 1 }}>
                  <LockOutlinedIcon fontSize="large" />
                </Box>
                <Typography component="h1" variant="h5">LincolnVerse Sign In</Typography>
                <Typography variant="body2" color="text.secondary">Access your LincolnVerse account</Typography>
              </Box>

              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  autoComplete="username"
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlineIcon /></InputAdornment> }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={togglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <FormControlLabel
                  control={<Checkbox checked={formData.remember} onChange={handleChange} name="remember" />}
                  label="Remember me"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, py: 1.5 }} disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                <Box textAlign="right" sx={{ mb: 1 }}>
                  <MuiLink component={RouterLink} to="/forgot-password" variant="body2" sx={{ color: 'primary.main' }}>
                    Forgot password?
                  </MuiLink>
                </Box>
                <Divider sx={{ my: 2 }}>Or</Divider>
                <Grid container spacing={2} direction={isSmall ? 'column' : 'row'}>
                  <Grid item xs>
                    <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>Google</Button>
                  </Grid>
                  <Grid item xs>
                    <Button fullWidth variant="outlined" startIcon={<GitHubIcon />}>GitHub</Button>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography variant="body2">
                      Don't have an account?{' '}
                      <MuiLink component={RouterLink} to="/register" underline="always" sx={{ color: 'primary.main' }}>
                        Sign Up
                      </MuiLink>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Container>
    </ThemeProvider>
  );
}

