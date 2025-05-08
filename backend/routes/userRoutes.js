// backend/routes/userRoutes.js
const express = require('express');
const bcrypt  = require('bcrypt');
const User    = require('../models/User');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const router  = express.Router();

/**
 * GET /user/profile
 * Returns { id, username, email, created_at }
 */
router.get('/profile', ensureAuthenticated, (req, res) => {
  const userId = req.session.user.id;
  User.findById(userId, (err, userRow) => {
    if (err)   return res.status(500).json({ error: err.message });
    if (!userRow) return res.status(404).json({ error: 'User not found' });
    res.json(userRow);
  });
});

/**
 * PUT /user/profile
 * Body: { username?: string, email?: string, password?: string }
 * If password is present, we’ll hash it and save under password_hash.
 */
router.put('/profile', ensureAuthenticated, async (req, res) => {
  const userId = req.session.user.id;
  const changes = {};
  const { username, email, password } = req.body;

  if (username?.trim()) changes.username = username.trim();
  if (email?.trim())    changes.email    = email.trim();
  if (password) {
    // hash new password
    try {
      changes.password_hash = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }
  }

  User.updateProfile(userId, changes, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    // If username changed, update session so front-end stays in sync
    if (changes.username) req.session.user.username = changes.username;
    res.json({ message: 'Profile updated successfully' });
  });
});

module.exports = router;
