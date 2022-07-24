const logger = require('../utils/logging').logger;
const requestinfostring = require('../utils/logging').requestinfostring;
const Appointment = require('../models/Appointment');

exports.listAll = function (req, res) {
	logger.info('Appointment.listAll called ' + requestinfostring(req));
	Appointment.find({}, function (err, data) {
		if (err) {
			res.send(err);
		}
		res.json(data);
	});
};

exports.getObjectById = function (req, res) {
	logger.info('Appointment.getObjectById called ' + requestinfostring(req));
	Appointment.findById(req.params.id, function (err, data) {
		if (err) {
			logger.error(err);
			res.send(err);
		}
		res.json(data);
	});
};

exports.postAppointment = async function (req, res) {
    logger.info('Appointment.postAppointment called ' + requestinfostring(req));
    try {
        const { name, email, phone, services, sdrname, age } = req.body;
        const appointment = new Appointment({
            name,
            email,
            phone,
            services,
            sdrname,
            age
        });
        await appointment.save();

        res.send({ type: "success", message: "successful" });
    } catch {(e) => {
        console.log(e);
    }}
    
}
