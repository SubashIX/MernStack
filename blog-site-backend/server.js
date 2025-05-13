const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load the .env file into process.env
dotenv.config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
