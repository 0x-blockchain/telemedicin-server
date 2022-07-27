const logger = require('../utils/logging').logger;
const requestinfostring = require('../utils/logging').requestinfostring;
const Feedback = require('../models/Feedback');

exports.listAll = async function (req, res) {
	logger.info('feedback.listAll called ' + requestinfostring(req));
	Feedback.find({}, function (err, data) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
};


exports.createOne = async function (req, res) {
	logger.info('feedback.createOne called ' + requestinfostring(req));
    const feedback = req.body;
    Feedback.create(feedback);
    res.status(200).json({ type: 'success', msg: 'Successfully submitted.'})
};
