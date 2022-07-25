const logger = require('../utils/logging').logger;
const requestinfostring = require('../utils/logging').requestinfostring;
const Doctor = require('../models/Doctor');
const multer = require('multer');


exports.searchDoctors = function (req, res) {
    logger.info('Doctors.searchDoctors called ' + requestinfostring(req));
    const { search } = req.body
    Doctor.find({ name : { $regex: search, $options: 'i' } }, function (err, data) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
}

exports.postDcotorProfile = async function (req, res) {
    logger.info('Doctors.postDoctorProfile called ' + requestinfostring(req));
    const { expFields, eduFields, lastFields, profileImage, email } = req.body;
    
    const user = await Doctor.findOne({ email });

    if(user) {
        const filter = { email };
        const update = { 
            experiences: expFields,
            educations: eduFields,
            biography: lastFields.bio,
            imagePath: ''
        };
        await Doctor.findOneAndUpdate(filter, update);
    } else {
        Doctor.create({
            experiences: expFields,
            educations: eduFields,
            biography: lastFields.bio,
            email: email,
            imagePath: ''
        })
    }
    res.status(200).json({message: 'success'});
}

exports.listAll = async function (req, res) {
	logger.info('Dcotors.listAll called ' + requestinfostring(req));
	Doctor.find({}, function (err, data) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
};

exports.selectOneWithEmail = function (req, res) {
	logger.info('Doctors.selectOneWithEmail called ' + requestinfostring(req));
    const email = req.params.email;
    console.log('email', email)
    Doctor.find({ email : email }, function (err, data) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
};