exports.getLandingPage = (req, res) => {
  res.render('index', { title: 'Welcome to MyBlogSpot' });
};
