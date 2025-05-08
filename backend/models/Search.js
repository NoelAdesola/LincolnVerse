// backend/models/Search.js

const db = require('../config/db');

class Search {
  /**
   * Save a new search for a given user.
   * @param {number} userId 
   * @param {string} query 
   * @param {function} callback (err, { id })
   */
  static create(userId, query, callback) {
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      return callback(new Error('Query must not be empty'));
    }
    db.run(
      `INSERT INTO searches (user_id, query) VALUES (?, ?)`,
      [userId, cleanQuery],
      function (err) {
        if (err) return callback(err);
        // this.lastID is the new row’s ID
        callback(null, { id: this.lastID });
      }
    );
  }

  /**
   * Fetch all searches for a user, most recent first.
   * @param {number} userId 
   * @param {function} callback (err, rows)
   */
  static findAllByUser(userId, callback) {
    db.all(
      `SELECT id, query, timestamp
       FROM searches
       WHERE user_id = ?
       ORDER BY timestamp DESC`,
      [userId],
      callback
    );
  }

  /**
   * Fetch the N most recent searches for a user.
   * @param {number} userId 
   * @param {number} limit 
   * @param {function} callback (err, rows)
   */
  static findRecentByUser(userId, limit = 10, callback) {
    db.all(
      `SELECT id, query, timestamp
       FROM searches
       WHERE user_id = ?
       ORDER BY timestamp DESC
       LIMIT ?`,
      [userId, limit],
      callback
    );
  }

  /**
   * Delete a single search entry (only if it belongs to the user).
   * @param {number} id 
   * @param {number} userId 
   * @param {function} callback (err)
   */
  static deleteById(id, userId, callback) {
    db.run(
      `DELETE FROM searches WHERE id = ? AND user_id = ?`,
      [id, userId],
      callback
    );
  }
}

module.exports = Search;
