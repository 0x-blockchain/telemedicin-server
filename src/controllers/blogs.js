const logger = require('../utils/logging').logger;
const requestinfostring = require('../utils/logging').requestinfostring;
const Blog = require('../models/Blogs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/blogs');
    },

    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

exports.listAll = function (req, res) {
	logger.info('Blog.listAll called ' + requestinfostring(req));
	Blog.find({}, function (err, data) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
};

exports.getObjectById = function (req, res) {
	logger.info('Blog.getObjectById called ' + requestinfostring(req));
	Blog.findById(req.params.id, function (err, data) {
		if (err) {
			logger.error(err);
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
};

exports.postBlog = async function (req, res) {
    logger.info('Blog.postBlog called ' + requestinfostring(req));
    let upload = multer({ storage: storage }).single('image');
    upload(req, res, async function(err) {
        const { blog } = req.body;
        const tempdata = JSON.parse(blog);

        const { title, content } = tempdata;
        const result = await Blog.create({
            title, content, imagePath: req.file?.path
        })
        res.status(200).json({type: 'success', msg: 'successfully submitted'});
    })
    
}

exports.updateBlog = async function (req, res) {
    logger.info('Blog.postBlog called ' + requestinfostring(req));
    let upload = multer({ storage: storage }).single('image');
    upload(req, res, async function(err) {
        const { blog } = req.body;
        const tempdata = JSON.parse(blog);
        const { _id, title, content } = tempdata;
        const filter = { _id };
        const update = req.file ? { 
            title, content, imagePath: req.file?.path
        } : { 
            title, content
        };

        await Blog.findOneAndUpdate(filter, update);

        res.status(200).json({type: 'success', msg: 'successfully updated'});
    })
    
}

exports.deleteBlog = async function (req, res) {
    logger.info('Blog.deleteBlog called ' + requestinfostring(req));

    const {selected} = req.body;
    try {
        const promises = selected.map(async item => {
            return await Blog.findByIdAndDelete(item);   
        })
        
        // wait until all promises resolve
        const results = await Promise.all(promises)
        if(results) {
            const data = await Blog.find({});
            res.status(200).json(data);
        }
    } catch {
        res.status(400).json({msg: 'Something went wrong.'});
    }
    
    
}
