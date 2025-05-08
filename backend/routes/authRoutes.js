// backend/routes/authRoutes.js
const express = require('express');
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');
const db      = require('../config/db');
const router  = express.Router();

// Register
router.post('/register', async (req, res) => {
  console.log('🔔 [REGISTER] payload:', req.body);
  try {
    const { username, email, password } = req.body;
    if (!username?.trim() || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are both required' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    User.create(
      { username: username.trim(), email: email?.trim() || null, password_hash },
      (err) => {
        if (err) {
          console.error('❌ [REGISTER] SQL error:', err);
          if (err.message.includes('UNIQUE constraint failed')) {
            return res
              .status(400)
              .json({ error: 'That username or email is already taken' });
          }
          return res.status(500).json({ error: err.message });
        }
        console.log('✅ [REGISTER] New user created:', username);
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  } catch (err) {
    console.error('❌ [REGISTER] Unexpected error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username?.trim() || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  User.findByUsername(username.trim(), async (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    req.session.user = { id: user.id, username: user.username };
    res.json({ message: 'Login successful' });
  });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out' });
  });
});

// Forgot Password (stub – no email actually sent)
router.post('/forgot-password', (req, res) => {
  const { username } = req.body;
  if (!username?.trim()) {
    return res.status(400).json({ error: 'Username is required' });
  }
  User.findByUsername(username.trim(), (err, user) => {
    // Always return OK to avoid user enumeration
    return res.json({
      message: 'If that user exists, a reset link has been sent.'
    });
  });
});

// Reset Password Confirm – immediate update
router.post('/reset-password-confirm', async (req, res) => {
  const { username, newPassword } = req.body;
  if (!username?.trim() || !newPassword) {
    return res
      .status(400)
      .json({ error: 'Username and newPassword are required' });
  }
  try {
    const password_hash = await bcrypt.hash(newPassword, 10);
    db.run(
      `UPDATE users SET password_hash = ? WHERE username = ?`,
      [password_hash, username.trim()],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) {
          return res.status(400).json({ error: 'User not found' });
        }
        res.json({ message: 'Password has been reset successfully' });
      }
    );
  } catch (err) {
    console.error('❌ [RESET] Unexpected error:', err);
    res.status(500).json({ error: 'Server error during reset' });
  }
});

module.exports = router;
