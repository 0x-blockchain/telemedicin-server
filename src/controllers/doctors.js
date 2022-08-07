const logger = require('../utils/logging').logger;
const requestinfostring = require('../utils/logging').requestinfostring;
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
let fs = require('fs-extra');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/doctors');
    },

    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

exports.searchDoctors = async function (req, res) {
    logger.info('Doctors.searchDoctors called ' + requestinfostring(req));
    const { keyword } = req.body;
    Doctor.find({$or: [{ fname : { $regex: keyword, $options: 'i' } }, { lname : { $regex: keyword, $options: 'i' } }] }, function (err, data) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
}

exports.postDcotorProfile = async function (req, res) {
    logger.info('Doctors.postDoctorProfile called ' + requestinfostring(req));
    let upload = multer({ storage: storage }).fields(
        [
            {
                name:'avatar',
            },
            {
                name: 'license'
            }
        ]
    );
    upload(req, res, async function(err) {
        const { expFields, eduFields, lastFields, email } = req.body;
        const user = await User.findOne({ email });
        if(user) {
            const isExit = await Doctor.findOne({ email });
            const tempExpFields = JSON.parse(expFields);
            const tempEduFields = JSON.parse(eduFields);
            const tempLastFields = JSON.parse(lastFields);
            if(isExit) {
                const filter = { email };
                let update = {
                    experiences: tempExpFields,
                    educations: tempEduFields,
                    biography: tempLastFields.bio,
                    fname: user.fname,
                    lname: user.lname,
                    major: tempLastFields.major,
                    phone: tempLastFields.phone,
                    address: tempLastFields.address,
                }
                if (req.files.license) {
                    update.licensePath = req.files?.license[0].path
                }

                if (req.files.avatar) {
                    update.avatarPath = req.files?.avatar[0].path
                }

                await Doctor.findOneAndUpdate(filter, update);
            } else {
                Doctor.create({
                    experiences: tempExpFields,
                    educations: tempEduFields,
                    biography: tempLastFields.bio,
                    fname: user.fname,
                    lname: user.lname,
                    major: tempLastFields.major,
                    phone: tempLastFields.phone,
                    imagePath: req.file?.path,
                    email: email,
                    address: tempLastFields.address
                })
            }
            res.status(200).json({msg: 'Profile successfully submitted.'});
        } else {
            res.status(400);
        }
    })
    
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
    Doctor.findOne({ email : email }, function (err, data) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
};

exports.selectOne = function (req, res) {
	logger.info('Doctors.selectOne called ' + requestinfostring(req));
    const id = req.params.id;
    Doctor.findById(id, function (err, data) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
};