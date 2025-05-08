const Favorite = require('../models/Favorite');

exports.addFavorite = (req, res) => {
  const { media_id, media_type, title, thumbnail_url, url } = req.body;
  const userId = req.session.user.id;
  Favorite.add(userId, media_id, media_type, title, thumbnail_url, url, err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Added to favorites' });
  });
};

exports.getFavorites = (req, res) => {
  const userId = req.session.user.id;
  Favorite.getByUser(userId, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.removeFavorite = (req, res) => {
  const userId = req.session.user.id;
  const favId  = Number(req.params.id);
  Favorite.remove(favId, userId, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Favorite removed' });
  });
};
