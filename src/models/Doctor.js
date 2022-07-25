const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    experiences: {
        type: Array
    },
    educations: {
        type: Array
    },
    email: {
        type: String,
        required: true
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
    }
});

module.exports = mongoose.model('doctor', DoctorSchema);