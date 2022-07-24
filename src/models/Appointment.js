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
  sdrname: {
    type: String,
    required: true
  },
  age : {
    type: String,
    required: true
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