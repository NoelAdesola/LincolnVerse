// backend/controllers/searchController.js
const db = require('../config/db');

/**
 * POST /search/save
 * (200) Save a new search into the user’s history.
 */
exports.saveSearch = (req, res) => {
  const { query } = req.body;
  if (!query || !query.trim()) {
    return res.status(400).json({ error: 'Query is required' });
  }
  const user_id = req.session.user.id;
  db.run(
    `INSERT INTO searches (user_id, query) VALUES (?, ?)`,
    [user_id, query.trim()],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      // default 200 OK
      res.json({
        id: this.lastID,
        query: query.trim(),
        timestamp: new Date().toISOString()
      });
    }
  );
};

/**
 * GET /search/recent
 * (200) Get the most recent 10 searches for the logged-in user.
 */
exports.getRecentSearches = (req, res) => {
  const user_id = req.session.user.id;
  db.all(
    `SELECT id, query, timestamp
     FROM searches
     WHERE user_id = ?
     ORDER BY timestamp DESC
     LIMIT 10`,
    [user_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows); // 200 OK
    }
  );
};

/**
 * DELETE /search/:id
 * (200) Delete a search by its ID (only if it belongs to the user).
 */
exports.deleteSearch = (req, res) => {
  const search_id = Number(req.params.id);
  const user_id   = req.session.user.id;
  if (isNaN(search_id)) {
    return res.status(400).json({ error: 'Invalid search ID' });
  }

  db.run(
    `DELETE FROM searches WHERE id = ? AND user_id = ?`,
    [search_id, user_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Search not found' });
      }
      res.json({ message: 'Search deleted' });
    }
  );
};
