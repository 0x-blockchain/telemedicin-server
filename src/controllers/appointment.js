const logger = require('../utils/logging').logger;
const requestinfostring = require('../utils/logging').requestinfostring;
const Appointment = require('../models/Appointment');

exports.listAll = function (req, res) {
	logger.info('Appointment.listAll called ' + requestinfostring(req));
	Appointment.find({}).sort({date: -1}).exec( function (err, data) {
		if (err) {
			res.send(err);
		}
		res.status(200).json(data);
	});
};

exports.lastAppointments = function (req, res) {
	logger.info('Appointment.lastAppointments called ' + requestinfostring(req));
    let today = new Date();
    today.setHours(0,0,0,0);

    const options = { $and:[
        {book_date: {$lt: today}},
        {doctorEmail: req.params.email}
    ]}
	Appointment.find(options).sort({date: -1}).exec( function (err, data) {
		if (err) {
			res.send(err);
		}
		res.status(200).json(data);
	});
};

exports.comingAppointments = function (req, res) {
	logger.info('Appointment.lastAppointments called ' + requestinfostring(req));
    let today = new Date();
    today.setHours(0,0,0,0);

    const options = {$and: [
        {book_date: {$gt: today}},
        {doctorEmail: req.params.email}
    ]}
	Appointment.find(options).sort({date: -1}).exec( function (err, data) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
};

exports.patientComingAppointments = function (req, res) {
	logger.info('Appointment.patientComingAppointments called ' + requestinfostring(req));
    let today = new Date();
    today.setHours(0,0,0,0);
    const options = {$and: [
        {book_date: {$gte: today}},
        {email: req.params.email}
    ]}
	Appointment.find(options).sort({date: -1}).exec( function (err, data) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
};

exports.patientLastAppointments = function (req, res) {
	logger.info('Appointment.patientLastAppointments called ' + requestinfostring(req));
    let today = new Date();
    today.setHours(0,0,0,0);

    const options = { $and:[
        {book_date: {$lt: today}},
        {email: req.params.email}
    ]}
	Appointment.find(options).sort({date: -1}).exec( function (err, data) {
		if (err) {
			res.send(err);
		}
		res.status(200).json(data);
	});
};

exports.todayAppointments = function (req, res) {
	logger.info('Appointment.lastAppointments called ' + requestinfostring(req));
    let today = new Date();
    today.setHours(0,0,0,0);

    let tomorrow = new Date()
    tomorrow.setHours(23,59,59,999);
    const options = {$and: [
        {book_date: {$gte: today, $lt: tomorrow}},
        {doctorEmail: req.params.email}
    ]}
	Appointment.find(options).sort({date: -1}).exec( function (err, data) {
		if (err) {
			res.send(err);
		}
		res.status(200).json(data);
	});
};

exports.getObjectById = function (req, res) {
	logger.info('Appointment.getObjectById called ' + requestinfostring(req));
	Appointment.findById(req.params.id, function (err, data) {
		if (err) {
			logger.error(err);
			res.send(err);
		}
		res.status(200).json(data);
	});
};

exports.postAppointment = async function (req, res) {
    logger.info('Appointment.postAppointment called ' + requestinfostring(req));
    try {
        const { name, email, phone, services, age, doctorEmail, doctorName, doctorPhone, date, event, meetingUrl } = req.body;
        const appointment = new Appointment({
            name,
            email,
            phone,
            services,
            doctorEmail,
            doctorName,
            doctorPhone,
            age,
            meetingUrl,
            book_date: date,
            book_time: event
        });
        await appointment.save();
        res.status(200).json({ type: "success", msg: "Appointment successfully submitted." });
    } catch {(e) => {
        console.log(e);
    }}
    
}

exports.feedbackById = async function (req, res) {
    logger.info('Appointment.feedbackById called ' + requestinfostring(req));
    try {
        const { id, reviews, rating } = req.body;
        console.log(reviews, rating)
        const update = {
            reviews: reviews, 
            feedback: rating
        }
        Appointment.findByIdAndUpdate(id, update,  async function (err, data) {
            if (err) {
                logger.error(err);
                res.status(400).send(err);
            }
            res.status(200).json({ type: "success", msg: "Feedback successfully submitted." });
        });
    } catch {(e) => {
        res.status(400).json({msg: 'Something went wrong.'});
    }}
    
}

exports.deleteAppointment = async function (req, res) {
    logger.info('Appointment.deleteAppointment called ' + requestinfostring(req));
    try {
        const { selected } = req.body;

        try {
            const promises = selected.map(async item => {
                return await Appointment.findByIdAndDelete(item);   
            })
            
            const results = await Promise.all(promises)
            if(results) {
                const data = await Appointment.find({});
                res.status(200).json(data);
            }
        } catch {
            res.status(400).json({msg: 'Something went wrong.'});
        }
    } catch {(e) => {
        console.log(e);
    }}
    
}
