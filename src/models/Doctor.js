const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  experiences: {
    type: Array
  },
  educations: {
    type: Array
  },
  biography: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
//   name: {
//     type: String,
//     required: true
//   },
//   phone: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   }
});

module.exports = mongoose.model('doctor', DoctorSchema);