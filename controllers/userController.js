const logger = require('../utils/logging').logger;
const requestinfostring = require('../utils/logging').requestinfostring;
const userModel = require('../models/userModel.js');

exports.listAll = function (req, res) {
	logger.info('userModel.listAll called ' + requestinfostring(req));
	userModel.find({}, function (err, data) {
		if (err) {
			res.send(err);
		}
		res.json(data);
	});
};

exports.getObjectById = function (req, res) {
	logger.info('userModel.getObjectById called ' + requestinfostring(req));
	userModel.findById(req.params.id, function (err, data) {
		if (err) {
			logger.error(err);
			res.send(err);
		}
		res.json(data);
	});
};
