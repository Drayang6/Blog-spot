const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/admin/login', adminController.showLoginForm);
router.post('/admin/login', adminController.loginAdmin);
router.get('/admin/logout', adminController.logoutAdmin);
router.get('/admin/dashboard', adminMiddleware, adminController.showDashboard);
function requireAdmin(req, res, next) {
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(403).send('Access denied');
  }
}

// Admin dashboard route
router.get('/admin-dashboard', requireAdmin, (req, res) => {
  res.render('admin-dashboard', {
    title: 'Admin Dashboard',
    email: req.session.userEmail
  });
});
module.exports = router;
