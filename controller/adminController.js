const bcrypt = require('bcrypt');
const { findAdminByEmail, createAdmin } = require('../models/adminModel');

exports.showLoginForm = (req, res) => {
  res.render('admin/login');
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await findAdminByEmail(email);
  if (!admin) return res.send('Admin not found');

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.send('Invalid credentials');

  req.session.isAdmin = true;
  req.session.adminEmail = admin.email;
  res.redirect('/admin/dashboard');
};

exports.logoutAdmin = (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
};

exports.showDashboard = (req, res) => {
  res.render('admin/dashboard', { adminEmail: req.session.adminEmail });
};
