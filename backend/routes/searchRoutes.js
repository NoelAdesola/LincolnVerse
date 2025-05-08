// backend/routes/searchRoutes.js
const express = require('express');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const {
  saveSearch,
  getRecentSearches,
  deleteSearch
} = require('../controllers/searchController');

const router = express.Router();

router.post('/save',   ensureAuthenticated, saveSearch);
router.get('/recent',  ensureAuthenticated, getRecentSearches);
router.delete('/:id',  ensureAuthenticated, deleteSearch);

module.exports = router;
