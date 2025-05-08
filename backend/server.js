// server.js
const express       = require('express');
const session       = require('express-session');
const cors          = require('cors');
require('dotenv').config();

// Import your route modules
const authRoutes      = require('./routes/authRoutes');
const passwordRoutes  = require('./routes/passwordRoutes');
const userRoutes      = require('./routes/userRoutes');
const searchRoutes    = require('./routes/searchRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const contactRoutes   = require('./routes/contactRoutes');

const app = express();

// CORS + body parsing + sessions
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }
  })
);

// Mount your routes
app.use('/auth', authRoutes);                      // register, login, logout
app.use('/auth/password', passwordRoutes);         // forgot/reset password
app.use('/user', userRoutes);                      // profile endpoints
app.use('/search', searchRoutes);                  // save/get/delete searches
app.use('/favorites', favoritesRoutes);            // get/add/remove favorites
app.use('/contact', contactRoutes);                // contact form submissions

// Catch-all for 404s
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

// Export the app for testing
module.exports = app;

// If run directly, start the server
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
