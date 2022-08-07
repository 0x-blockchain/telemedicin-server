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
    avatarPath: {
        type: String,
    },
    licensePath: {
        type: String,
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('doctor', DoctorSchema);