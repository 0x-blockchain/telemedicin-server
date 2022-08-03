const logger = require('../utils/logging').logger;
const requestinfostring = require('../utils/logging').requestinfostring;
const Appointment = require('../models/Appointment');

exports.listAll = function (req, res) {
	logger.info('Appointment.listAll called ' + requestinfostring(req));
	Appointment.find({}, function (err, data) {
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
        const { name, email, phone, services, age, did } = req.body;
        const appointment = new Appointment({
            name,
            email,
            phone,
            services,
            did,
            age
        });
        await appointment.save();
        res.status(200).json({ type: "success", msg: "Appointment successfully submitted." });
    } catch {(e) => {
        console.log(e);
    }}
    
}

exports.deleteAppointment = async function (req, res) {
    logger.info('Appointment.postAppointment called ' + requestinfostring(req));
    try {
        const { selected } = req.body;

        try {
            const promises = selected.map(async item => {
                return await Appointment.findByIdAndDelete(item);   
            })
            
            // wait until all promises resolve
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
