const mongoose = require('mongoose');

const SampleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  tags: {
    type: String
  },
  content: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('sample', SampleSchema);