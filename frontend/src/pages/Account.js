// src/pages/Account.js
import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, logoutUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';

const Account = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch profile on mount
  useEffect(() => {
    getUserProfile()
      .then(res => {
        setProfile({
          username: res.data.username || '',
          email: res.data.email || ''
        });
      })
      .catch(() => {
        setError('Failed to load profile.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSave = async e => {
    e.preventDefault();
    if (!profile.username.trim()) {
      setError('Username cannot be empty.');
      return;
    }
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await updateUserProfile(profile);
      setSuccess('Profile updated successfully.');
    } catch {
      setError('Update failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      console.warn('Logout failed, clearing client state anyway.');
    }
    setUser(null);
    navigate('/login');
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {user ? `Signed in as ${user.username}` : 'You are not signed in.'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box component="form" onSubmit={handleSave} noValidate>
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          name="username"
          value={profile.username}
          onChange={handleChange}
          autoComplete="username"
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, mb: 1.5 }}
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box textAlign="center">
        <Button
          variant="outlined"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Box>
    </Container>
  );
};

export default Account;
