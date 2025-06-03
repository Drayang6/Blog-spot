const bcrypt = require('bcrypt');
const { createUser } = require('../models/userModel');
const pool = require('../config/db'); // Import the pool object for database connection

// Show signup form
exports.showSignupForm = (req, res) => {
  res.render('signup');
};

// Handle signup logic
exports.handleSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(name, email, hashedPassword);
    res.redirect('/login');
  } catch (err) {
    res.status(500).send('Error creating user: ' + err.message);
  }
};

// Handle login logic


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Check if the login matches admin credentials in .env
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      req.session.isAdmin = true;
      req.session.userEmail = email;
      return res.redirect('/admin-dashboard');
    }

    // Otherwise, proceed with normal user login
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.send('User not found');
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.send('Invalid credentials');
    }

    req.session.userId = user.id;
    req.session.userName = user.name;

    res.redirect('/home');
    
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
};

exports.logoutUser = (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error during logout');
    }
    // Redirect to the index page after logout
    res.redirect('/');
  });
};
