const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Adjust the path to your database config

// Route for home page, fetching posts and user information
router.get('/home', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    const posts = result.rows; // Store the result in posts

    // Get the logged-in user's username from session
    const userName = req.session.userName; // Assuming you set userName in session on login

    // Render the home page and pass the posts and userName data
    res.render('home', { posts, userName }); // Pass posts and userName to the view
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    res.status(500).send('Error fetching posts');
  }
});

module.exports = router;
