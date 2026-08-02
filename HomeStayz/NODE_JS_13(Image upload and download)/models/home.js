const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  houseName: {
    type : String,
    required: true
  },
  price: {
    type : Number,
    required: true
  },
  rating: {
    type : Number,
    required: true
  },
  location : {
    type : String,
    required: true
  },
  rulesPdf: {
  type: String,
  required: false
  },
  photourl: String,
  description: String,
});


module.exports = mongoose.model('home',homeSchema);
