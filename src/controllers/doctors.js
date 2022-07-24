const logger = require('../utils/logging').logger;
const requestinfostring = require('../utils/logging').requestinfostring;
const Doctor = require('../models/Doctor');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(__dirname);
        fs.mkdirsSync(__dirname + '/uploads/images');
        cb(null, 'uploads/images');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


exports.searchDoctors = function (req, res) {
    logger.info('Doctors.searchDoctors called ' + requestinfostring(req));
    const { search } = req.body
    Doctor.find({ name : { $regex: search, $options: 'i' } }, function (err, data) {
		if (err) {
			res.send(err);
		}
		res.json(data);
	});
}

exports.postDcotorProfile = function (req, res) {
    logger.info('Doctors.postDoctorProfile called ' + requestinfostring(req));
    const { expFields, eduFields, lastFields, profileImage } = req.body;

    Doctor.create({
        experiences: expFields,
        educations: eduFields,
        biography: lastFields.bio
    })

    res.json({message: 'success'});

    // Doctor.find({ name : { $regex: search, $options: 'i' } }, function (err, data) {
	// 	if (err) {
	// 		res.send(err);
	// 	}
	// 	res.json(data);
	// });
}

exports.listAll = function (req, res) {
	logger.info('Dcotors.listAll called ' + requestinfostring(req));
	Doctor.find({}, function (err, data) {
		if (err) {
			res.send(err);
		}
		res.json(data);
	});
};