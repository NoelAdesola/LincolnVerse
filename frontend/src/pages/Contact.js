// src/pages/Contact.js
import React, { useState, useEffect } from 'react';
import { sendContactMessage } from '../services/api';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Slide
} from '@mui/material';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' }); // website = honeypot
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: '', error: '' });

  // Validate on change or blur
  useEffect(() => {
    const newErr = {};
    if (touched.name && !form.name.trim()) newErr.name = 'Name is required.';
    if (touched.email) {
      if (!form.email.trim()) newErr.email = 'Email is required.';
      else if (!emailRegex.test(form.email)) newErr.email = 'Enter a valid email.';
    }
    if (touched.message && !form.message.trim()) newErr.message = 'Message cannot be empty.';
    setErrors(newErr);
  }, [form, touched]);

  const isValid = 
    form.name.trim() &&
    emailRegex.test(form.email) &&
    form.message.trim() &&
    !form.website; // honeypot must be empty

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setStatus({ success: '', error: '' });
  };

  const handleBlur = e => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    setLoading(true);
    try {
      await sendContactMessage({ name: form.name, email: form.email, message: form.message });
      setStatus({ success: 'Your message has been sent. We’ll get back to you shortly.', error: '' });
      setForm({ name: '', email: '', message: '', website: '' });
      setTouched({});
    } catch {
      setStatus({ success: '', error: 'Failed to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box maxWidth="sm" mx="auto">
        <Typography variant="h4" gutterBottom>Contact Us</Typography>

        <Box aria-live="polite">
          <Slide in={Boolean(status.error)} direction="down">
            <div>
              {status.error && <Alert severity="error" sx={{ mb: 2 }}>{status.error}</Alert>}
            </div>
          </Slide>
          <Slide in={Boolean(status.success)} direction="down">
            <div>
              {status.success && <Alert severity="success" sx={{ mb: 2 }}>{status.success}</Alert>}
            </div>
          </Slide>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Honeypot field */}
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            style={{ display: 'none' }}
            autoComplete="off"
          />

          <TextField
            fullWidth
            label="Your Name"
            name="name"
            margin="normal"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.name)}
            helperText={errors.name}
            required
          />
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            margin="normal"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.email)}
            helperText={errors.email}
            required
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            margin="normal"
            multiline
            rows={4}
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.message)}
            helperText={errors.message}
            required
          />

          <Box mt={2} textAlign="right">
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Sending…' : 'Send Message'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;
