const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const index = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const welcomeRoute = require('./routes/welcomeRoute'); 
const authMiddleware = require('./middleware/authMiddleware');
const mypostRoutes = require('./routes/mypostRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
// Import and run table creation
const { createPostsTable } = require('./models/mypostModel');
createPostsTable(); // Create posts table at server startup
const { createAdminTable } = require('./models/adminModel');
// Import the post model
const { } = require('./models/mypostModel');

// Create posts table and seed a sample post
createPostsTable(); // Ensure posts table exists
createAdminTable();

// Session setup
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', index);
app.use('/', authRoutes);
app.use('/', homeRoutes);
app.use('/', welcomeRoute); 
app.use('/', mypostRoutes);
app.use('/', adminRoutes);

// Protected route
app.get('/home', authMiddleware, (req, res) => {
  res.render('home', { userName: req.session.userName });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
