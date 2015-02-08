var mongoose = require('mongoose');

// mongoose Schema
var RatingSchema = new mongoose.Schema({
  restaurant: String,
  location: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
});

// mongoose model
var Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;