// Import the required modules
const mongoose = require('mongoose');
const Badge = require('./database/models/badge');

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://Nexus:emun6qHLYPlgzqNh@cluster0.0cbhqtf.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a new badge document
const badge = new Badge({
  User: '1141808347402739732',
  FLAGS: ['DEVELOPER']
});

// Save the badge document to the database
badge.save((err, badge) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Added ${badge.User} as a developer.`);
  }
});