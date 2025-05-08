const express = require('express');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const {
  addFavorite,
  getFavorites,
  removeFavorite
} = require('../controllers/favoritesController');

const router = express.Router();

router.post   ('/',        ensureAuthenticated, addFavorite);
router.get    ('/',        ensureAuthenticated, getFavorites);
router.delete('/:id(\\d+)', ensureAuthenticated, removeFavorite);

module.exports = router;
