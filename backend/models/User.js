// src/models/User.js
const db = require('../config/db');

class User {
  /**
   * 1) Create a user with optional email
   * @param {{username: string, email?: string, password_hash: string}} data
   * @param {function(err: Error)} callback
   */
  static create({ username, email, password_hash }, callback) {
    db.run(
      `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`,
      [username.trim(), email?.trim() || null, password_hash],
      callback
    );
  }

  /**
   * 2) Find by username
   * @param {string} username
   * @param {function(err: Error, row: object)} cb
   */
  static findByUsername(username, cb) {
    db.get(
      `SELECT * FROM users WHERE username = ?`,
      [username.trim()],
      cb
    );
  }

  /**
   * 3) Find by email (for forgot‐password)
   * @param {string} email
   * @param {function(err: Error, row: object)} cb
   */
  static findByEmail(email, cb) {
    db.get(
      `SELECT * FROM users WHERE email = ?`,
      [email.trim()],
      cb
    );
  }

  /**
   * 4) Save a reset token + expiry
   * @param {number} id
   * @param {string} token
   * @param {number} expires  Unix timestamp
   * @param {function(err: Error)} cb
   */
  static saveResetToken(id, token, expires, cb) {
    db.run(
      `UPDATE users SET reset_token = ?, reset_expires = ? WHERE id = ?`,
      [token, expires, id],
      cb
    );
  }

  /**
   * 5) Verify a reset token is still valid
   * @param {string} token
   * @param {function(err: Error, row: object)} cb
   */
  static findByResetToken(token, cb) {
    db.get(
      `SELECT * FROM users
       WHERE reset_token = ?
         AND reset_expires > strftime('%s','now')`,
      [token],
      cb
    );
  }

  /**
   * 6) Reset password and clear token
   * @param {number} id
   * @param {string} newHash
   * @param {function(err: Error)} cb
   */
  static resetPassword(id, newHash, cb) {
    db.run(
      `UPDATE users 
         SET password_hash = ?, reset_token = NULL, reset_expires = NULL 
       WHERE id = ?`,
      [newHash, id],
      cb
    );
  }

  /**
   * 7) Find by ID (for sessions, profile view)
   * @param {number} id
   * @param {function(err: Error, row: object)} cb
   */
  static findById(id, cb) {
    db.get(
      `SELECT id, username, email, created_at FROM users WHERE id = ?`,
      [id],
      cb
    );
  }

  /**
   * 8) Update profile fields (username/email)
   * @param {number} id
   * @param {{username?: string, email?: string}} changes
   * @param {function(err: Error)} cb
   */
  static updateProfile(id, changes, cb) {
    const sets = [];
    const params = [];

    if (changes.username) {
      sets.push(`username = ?`);
      params.push(changes.username.trim());
    }
    if (changes.email) {
      sets.push(`email = ?`);
      params.push(changes.email.trim());
    }
    if (!sets.length) return cb(null);

    const sql = `UPDATE users SET ${sets.join(', ')} WHERE id = ?`;
    params.push(id);
    db.run(sql, params, cb);
  }
}

module.exports = User;
