const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// ======= Middleware =======
app.use(cors());                         // Enable CORS
app.use(helmet());                       // Secure headers
app.use(morgan('dev'));                  // Log requests
app.use(express.json());                 // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Static file serving (e.g., image uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ======= Routes =======
app.use('/auth', authRoutes);    // Auth routes: /auth/signup, /auth/login
app.use('/blogs', blogRoutes);   // Blog routes: /blogs/...

// ======= Error Handler =======
app.use(errorHandler);           // Custom error handler

module.exports = app;