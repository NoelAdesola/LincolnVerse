// src/middleware/authMiddleware.js

const db = require('../config/db');

/**
 * Blocks unauthenticated access and loads full user into req.user
 */
function ensureAuthenticated(req, res, next) {
  // 1. Check session
  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // 2. Load user from DB
  const userId = req.session.user.id;
  db.get(
    'SELECT id, username FROM users WHERE id = ?',
    [userId],
    (err, user) => {
      if (err) {
        console.error('DB error loading user:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (!user) {
        // Session is stale, destroy it
        req.session.destroy(() => {});
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // Attach user and continue
      req.user = user;
      next();
    }
  );
}

module.exports = { ensureAuthenticated };
