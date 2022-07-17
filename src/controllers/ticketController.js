const logger = require('../utils/logging').logger;
const requestinfostring = require('../utils/logging').requestinfostring;
const ticketModel = require('../models/ticketModel.js');

exports.listAll = function (req, res) {
	logger.info('ticketModel.listAll called ' + requestinfostring(req));
	ticketModel.find({}, function (err, data) {
		if (err) {
			res.send(err);
		}
		res.json(data);
	});
};

exports.getObjectById = function (req, res) {
	logger.info('ticketModel.getObjectById called ' + requestinfostring(req));
	ticketModel.findById(req.params.id, function (err, data) {
		if (err) {
			logger.error(err);
			res.send(err);
		}
		res.json(data);
	});
};
