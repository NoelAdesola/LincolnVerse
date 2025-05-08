// src/pages/Register.js
import React, { useState, useMemo } from 'react';
import { registerUser } from '../services/api';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  FormControlLabel,
  FormHelperText,
  Switch,
  Checkbox,
  Backdrop,
  Fade,
  CircularProgress,
  LinearProgress,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import ThreeBackground from '../components/ThreeBackground';

export default function Register() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? 'dark' : 'light', primary: { main: '#009688' } } }),
    [darkMode]
  );

  const muiTheme = useTheme();
  const showBackground = useMediaQuery(muiTheme.breakpoints.up('md'));

  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '', terms: false, website: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (error) setError('');
  };
  const handleBlur = e => {
    const { name, value } = e.target;
    if (name === 'username' && !value.trim()) setError('Username is required');
    if (name === 'confirmPassword' && value !== formData.password) setError('Passwords do not match');
  };
  const togglePassword = () => setShowPassword(prev => !prev);
  const toggleConfirm = () => setShowConfirm(prev => !prev);

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getStrength = pwd => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };
  const rawStrength = getStrength(formData.password);
  const strength = Math.min(rawStrength, 3);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong'];
  const strengthPercent = (strength / 3) * 100;

  const isFormValid =
    formData.username.trim() &&
    formData.password.length >= 6 &&
    formData.password === formData.confirmPassword &&
    formData.terms &&
    (!formData.email || validateEmail(formData.email)) &&
    !formData.website;

  const validate = () => {
    if (!formData.username.trim()) { setError('Username is required'); return false; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return false; }
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return false; }
    if (!formData.terms) { setError('You must accept Terms and Privacy'); return false; }
    if (formData.email && !validateEmail(formData.email)) { setError('Invalid email address'); return false; }
    if (formData.website) { setError('Bot detected'); return false; }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await registerUser({ username: formData.username, email: formData.email, password: formData.password });
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showBackground && <ThreeBackground style={{ position: 'fixed', inset: 0, zIndex: -1, opacity: 0.1 }} />}
      <Container maxWidth="sm">
        <Box mt={2} display="flex" justifyContent="flex-end">
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={() => setDarkMode(prev => !prev)} color="default" aria-label="Toggle dark mode" />}
            label="Dark Mode"
            sx={{ color: 'text.primary' }}
          />
        </Box>
        <Fade in timeout={600}>
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', borderTop: 4, borderColor: 'primary.main', position: 'relative' }}>
              {loading && (
                <Backdrop open sx={{ position: 'absolute', color: '#fff', zIndex: theme.zIndex.drawer + 1 }}>
                  <CircularProgress />
                </Backdrop>
              )}
              <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 1, borderRadius: '50%', mb: 1 }}>
                  <PersonAddIcon fontSize="large" />
                </Box>
                <Typography variant="h5" gutterBottom>Create Account</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Sign up to LincolnVerse</Typography>
              </Box>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
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
                  onBlur={handleBlur}
                  InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlineIcon /></InputAdornment> }}
                  error={!formData.username.trim()}
                  helperText={!formData.username.trim() ? 'Enter a username' : ''}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email (Optional)"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(formData.email && !validateEmail(formData.email))}
                  helperText={formData.email && !validateEmail(formData.email) ? 'Invalid email' : ''}
                  InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
                />
                <TextField
                  type="hidden"
                  name="website"
                  value={formData.website}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Use at least 6 chars, uppercase, number, symbol"><InfoIcon fontSize="small" sx={{ mr: 1 }} /></Tooltip>
                        <IconButton aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={togglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'} onClick={toggleConfirm} edge="end">
                          {showConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Box sx={{ mt: 1, mb: 2 }}>
                  <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                    Password strength: {strengthLabels[strength]}
                  </Typography>
                  <LinearProgress variant="determinate" value={strengthPercent} sx={{ height: 6, borderRadius: 3 }} />
                </Box>
                <FormControlLabel
                  control={<Checkbox name="terms" checked={formData.terms} onChange={handleChange} color="primary" />}
                  label={<Typography variant="body2">I agree to the <RouterLink to="/terms" target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.primary.main }}>Terms of Service</RouterLink> and <RouterLink to="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.primary.main }}>Privacy Policy</RouterLink></Typography>}
                />
                <FormHelperText sx={{ mb: 2 }}>You must accept to create account</FormHelperText>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!isFormValid || loading}
                  sx={{ py: 1.5 }}
                >
                  {loading ? <CircularProgress size={20} color="inherit" /> : 'Create Account'}
                </Button>
                <Divider sx={{ my: 2 }}>Or</Divider>
                {/* Social sign-up */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>Sign up with Google</Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button fullWidth variant="outlined" startIcon={<GitHubIcon />}>Sign up with GitHub</Button>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography variant="body2">
                      Already have an account? <RouterLink to="/login" style={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Sign In</RouterLink>
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
