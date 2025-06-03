const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { logoutUser } = require('../controller/authController');

router.get('/signup', authController.showSignupForm);
router.post('/signup', authController.handleSignup);

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/home', authController.loginUser);
// Route for logging out
router.get('/logout', logoutUser);

module.exports = router;
