const logger = require('../utils/logging').logger;
const requestinfostring = require('../utils/logging').requestinfostring;
const articleModel = require('../models/articleModel.js');

exports.listAll = function (req, res) {
	logger.info('articleModel.listAll called ' + requestinfostring(req));
	articleModel.find({}, function (err, data) {
		if (err) {
			res.send(err);
		}
		res.json(data);
	});
};

exports.getObjectById = function (req, res) {
	logger.info('articleModel.getObjectById called ' + requestinfostring(req));
	articleModel.findById(req.params.id, function (err, data) {
		if (err) {
			logger.error(err);
			res.send(err);
		}
		res.json(data);
	});
};