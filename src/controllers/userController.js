const logger = require('../utils/logging').logger;
const requestinfostring = require('../utils/logging').requestinfostring;
const User = require('../models/User');

exports.listAll = function (req, res) {
	logger.info('User.listAll called ' + requestinfostring(req));
	User.find({}, function (err, data) {
		if (err) {
			res.send(err);
		}
		res.json(data);
	});
};

exports.getObjectById = function (req, res) {
	logger.info('User.getObjectById called ' + requestinfostring(req));
	User.findById(req.params.id, function (err, data) {
		if (err) {
			logger.error(err);
			res.send(err);
		}
		res.json(data);
	});
};
