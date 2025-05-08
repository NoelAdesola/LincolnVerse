const db = require('../config/db');

class Favorite {
  static add(userId, mediaId, mediaType, title, thumbUrl, url, cb) {
    db.run(
      `INSERT INTO favorites 
         (user_id, media_id, media_type, title, thumbnail_url, url) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, mediaId, mediaType, title, thumbUrl, url],
      cb
    );
  }

  static getByUser(userId, cb) {
    db.all(
      `SELECT id, media_id, media_type, title, thumbnail_url AS thumbnail, url
       FROM favorites WHERE user_id = ? ORDER BY id DESC`,
      [userId],
      cb
    );
  }

  static remove(id, userId, cb) {
    db.run(
      `DELETE FROM favorites WHERE id = ? AND user_id = ?`,
      [id, userId],
      cb
    );
  }
}

module.exports = Favorite;
