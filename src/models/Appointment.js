const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  services: {
    type: String,
    required: true
  },
  doctorEmail: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  doctorPhone: {
    type: String,
    required: true
  },
  age : {
    type: Number,
    required: true
  },
  book_date: {
    type: Date,
    required: true
  },
  book_time: {
    type: String,
    required: true
  },
  feedback: {
    type: Number,
    default: 100
  },
  reviews: {
    type: String,
    default: ''
  },
  meetingUrl: {
    type: String,
    default: ''
  },
  isopen: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('appointment', AppointmentSchema);