const mongoose = require('mongoose');

// Connect to Atlas using the URI loaded from .env.
mongoose.connect(process.env.MONGODB_URI)
  .then(function () {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(function (error) {
    console.error('MongoDB connection failed:', error.code, error.message);
  });