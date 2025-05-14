const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();


app.use(cors()); 
app.use(helmet());  
app.use(morgan('dev'));  
app.use(express.json());   
app.use(express.urlencoded({ extended: true })); 


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/auth', authRoutes); 
app.use('/blogs', blogRoutes);


app.use(errorHandler);

module.exports = app;