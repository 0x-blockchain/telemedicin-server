const logger = require('../utils/logging').logger;
const requestinfostring = require('../utils/logging').requestinfostring;
const NewsLetterEmails = require('../models/NewsLetterEmails');

exports.listAll = async function (req, res) {
	logger.info('NewsLetterEmails.listAll called ' + requestinfostring(req));
	NewsLetterEmails.find({}, function (err, data) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
};


exports.createOne = async function (req, res) {
	logger.info('NewsLetterEmails.listAll called ' + requestinfostring(req));

    const { email } = req.body;

    let user = await NewsLetterEmails.findOne({ email });

    if (user) {
        return res.status(400).json({ type: "failed", msg: 'Email already registered.' });
    } else {
        NewsLetterEmails.create({
            email: req.body.email
        })
        res.status(200).json({ type: 'success', msg: 'Newsletter Successfully submitted.'})
    }
};
