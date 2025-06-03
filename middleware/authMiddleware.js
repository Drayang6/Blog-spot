module.exports = (req, res, next) => {
  if (!req.session.user_Id) {
    // If no user session, redirect to login page
    return res.redirect('/login');
  }
  next(); // If session exists, proceed to the next route handler
};
