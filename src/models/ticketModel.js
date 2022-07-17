const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ticket', TicketSchema);