// controllers/authController.js
const bcrypt = require('bcrypt');
const User   = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    User.create(username, password_hash, (err) => {
      if (err) {
        // assume username uniqueness violation
        return res.status(400).json({ error: 'Username already exists' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  User.findByUsername(username, async (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // attach minimal user info to session
    req.session.user = { id: user.id, username: user.username };
    res.json({ message: 'Login successful', user: req.session.user });
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
};
