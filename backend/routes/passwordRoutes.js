// routes/passwordRoutes.js
const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const User = require('../models/User');

const router = express.Router();

// Ensure password_resets table exists
db.run(
  `CREATE TABLE IF NOT EXISTS password_resets (
     id          INTEGER PRIMARY KEY AUTOINCREMENT,
     user_id     INTEGER,
     token       TEXT UNIQUE,
     expires_at  INTEGER,
     FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
   )`,
  (err) => {
    if (err) console.error('Could not ensure password_resets table:', err.message);
  }
);

// POST /auth/forgot-password
router.post('/forgot-password', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  User.findByUsername(username, (err, user) => {
    // Don’t leak existence — always respond success
    if (err || !user) {
      return res.json({ message: 'If that account exists, a reset link has been sent.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires_at = Date.now() + 60 * 60 * 1000; // 1 hour

    db.run(
      `INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)`,
      [user.id, token, expires_at],
      (err2) => {
        if (err2) console.error('Error saving reset token:', err2);
        // TODO: send `token` to user.email via your mailer
        res.json({ message: 'If that account exists, a reset link has been sent.' });
      }
    );
  });
});

// POST /auth/reset-password-confirm
router.post('/reset-password-confirm', (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  db.get(
    `SELECT * FROM password_resets WHERE token = ? AND expires_at > ?`,
    [token, Date.now()],
    async (err, row) => {
      if (err || !row) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      // Hash and update password
      const passwordHash = await bcrypt.hash(newPassword, 10);
      db.run(
        `UPDATE users SET password_hash = ? WHERE id = ?`,
        [passwordHash, row.user_id],
        (err2) => {
          if (err2) return res.status(500).json({ error: 'Could not reset password' });
          // Clean up token
          db.run(`DELETE FROM password_resets WHERE id = ?`, [row.id]);
          res.json({ message: 'Password has been reset.' });
        }
      );
    }
  );
});

module.exports = router;
