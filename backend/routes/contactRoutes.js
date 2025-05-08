// routes/contactRoutes.js
const express = require('express');
const router = express.Router();

/**
 * @route POST /contact
 * @desc  Handle contact form submissions
 *        (In a real app you'd persist this or send an email)
 */
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
  }

  // For now, just log it
  console.log(`📝 Contact form received:
    From: ${name} <${email}>
    Message: ${message}
  `);

  res.json({ message: 'Your message has been received. We’ll get back to you shortly.' });
});

module.exports = router;
