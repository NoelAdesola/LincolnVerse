// src/pages/ForgotPassword.js
import React, { useState, useMemo } from 'react';
import { sendResetLink } from '../services/api';
import { Link as RouterLink } from 'react-router-dom';
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
  FormControlLabel,
  Switch,
  Backdrop,
  Fade,
  CircularProgress,
  Alert,
  InputAdornment,
  Link as MuiLink,
  Slide,
  useMediaQuery
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ThreeBackground from '../components/ThreeBackground';

export default function ForgotPassword() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? 'dark' : 'light', primary: { main: '#009688' } } }),
    [darkMode]
  );

  const showBackground = useMediaQuery(theme.breakpoints.up('md'));

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [canResend, setCanResend] = useState(false);

  const validateEmailFormat = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleEmailChange = e => {
    setEmail(e.target.value);
    if (emailError && validateEmailFormat(e.target.value)) setEmailError('');
  };

  const handleEmailBlur = () => {
    if (!email.trim()) setEmailError('Email is required');
    else if (!validateEmailFormat(email)) setEmailError('Invalid email address');
    else setEmailError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email.trim()) { setEmailError('Email is required'); return; }
    if (!validateEmailFormat(email)) { setEmailError('Invalid email address'); return; }

    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await sendResetLink({ email });
      setSuccess('A password reset link has been sent to your email.');
      setCanResend(true);
      setTimeout(() => setCanResend(false), 30000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => handleSubmit({ preventDefault: () => {} });

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
          <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', borderTop: 4, borderColor: 'primary.main', position: 'relative' }}>
              {loading && (
                <Backdrop open sx={{ position: 'absolute', color: '#fff', zIndex: theme.zIndex.drawer + 1 }}>
                  <CircularProgress />
                </Backdrop>
              )}
              <Box mb={2} textAlign="center">
                <Typography variant="h5" gutterBottom>Forgot Password</Typography>
                <Typography variant="body2" color="text.secondary">
                  Enter your email to receive a password reset link
                </Typography>
              </Box>
              <Box role="alert" aria-live="polite">
                <Slide direction="down" in={Boolean(error)} mountOnEnter unmountOnExit>
                  <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
                </Slide>
                <Slide direction="down" in={Boolean(success)} mountOnEnter unmountOnExit>
                  <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
                </Slide>
              </Box>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="email"
                  label="Email Address"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  error={Boolean(emailError)}
                  helperText={emailError}
                  InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, mb: 1, py: 1.5 }}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
                {success && (
                  <Button
                    fullWidth
                    variant="text"
                    sx={{ mb: 2 }}
                    onClick={handleResend}
                    disabled={!canResend}
                  >
                    {canResend ? 'Resend Email' : 'Resend Available in 30s'}
                  </Button>
                )}
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Can't find the email?{' '}
                  <MuiLink href="mailto:29857104@students.lincoln.ac.uk" underline="hover">
                    Contact Support
                  </MuiLink>
                </Typography>
                <Box textAlign="center" mt={2}>
                  <Typography variant="body2">
                    Remembered your password?{' '}
                    <MuiLink component={RouterLink} to="/login" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                      Sign In
                    </MuiLink>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Container>
    </ThemeProvider>
  );
}
