const logger = require('../utils/logging').logger;
const requestinfostring = require('../utils/logging').requestinfostring;
const Comment = require('../models/Comment');

// exports.listAll = async function (req, res) {
// 	logger.info('Comments.listAll called ' + requestInfotring(req));
    
//     Blog.find({}).sort({date: -1}).exec( function( err, data) {
//         if (err) {
// 			res.status(400).send(err);
// 		}
// 		res.status(200).json(data);
//     });
// };


// exports.latestBlogs = async function (req, res) {
// 	logger.info('Blog.listAll called ' + requestinfostring(req));
    
//     Blog.find({}).sort({date: -1}).limit(3).exec( function( err, data) {
//         if (err) {
// 			res.status(400).send(err);
// 		}
// 		res.status(200).json(data);
//     });
// };

exports.getCommentsById = function (req, res) {
	logger.info('Blog.getCommentsById called ' + requestinfostring(req));
	Comment.find({ blog_id: req.params.id }).sort({date: -1}).exec(function (err, data) {
		if (err) {
			logger.error(err);
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
};


exports.upCommentById = function (req, res) {
	logger.info('Comment.upCommentById called ' + requestinfostring(req));
    const { id } = req.body;
	Comment.findByIdAndUpdate(id, {$inc : {'upCnt' : 1}},  async function (err, data) {
		if (err) {
			logger.error(err);
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
};

exports.downCommentById = function (req, res) {
	logger.info('Comment.downCommentById called ' + requestinfostring(req));
	const { id } = req.body;
	Comment.findByIdAndUpdate(id, {$inc : {'downCnt' : 1}},  async function (err, data) {
		if (err) {
			logger.error(err);
			res.status(400).send(err);
		}
		res.status(200).json(data);
	});
};

// exports.getObjectByIdwithRelative = function (req, res) {
// 	logger.info('Blog.getObjectById called ' + requestinfostring(req));
    
// 	Blog.findById(req.params.id, async function (err, data) {
// 		if (err) {
// 			logger.error(err);
// 			res.status(400).send(err);
// 		}
//         const prev = await Blog.find({_id: {$gt: req.params.id}}).sort({date: -1}).limit(1);
//         const next = await Blog.find({_id: {$lt: req.params.id}}).sort({date: -1}).limit(1);

// 		res.status(200).json({data, prev, next});
// 	});

   
// };

exports.postComment = async function (req, res) {
    logger.info('Blog.postBlog called ' + requestinfostring(req));
    const { comment } = req.body;
    const { blog_id, content, name, email, phone, subject } = comment;
    const result = await Comment.create({
        blog_id, content, name, email, phone, subject
    })
    res.status(200).json({type: 'success', msg: 'Comment was successfully submitted.'});
}

// exports.updateBlog = async function (req, res) {
//     logger.info('Blog.postBlog called ' + requestinfostring(req));
//     let upload = multer({ storage: storage }).single('image');
//     upload(req, res, async function(err) {
//         const { blog } = req.body;
//         const tempdata = JSON.parse(blog);
//         const { _id, title, content } = tempdata;
//         const filter = { _id };
//         const update = req.file ? { 
//             title, content, imagePath: req.file?.path
//         } : { 
//             title, content
//         };

//         await Blog.findOneAndUpdate(filter, update);

//         res.status(200).json({type: 'success', msg: 'successfully updated'});
//     })
    
// }

// exports.deleteBlog = async function (req, res) {
//     logger.info('Blog.deleteBlog called ' + requestinfostring(req));

//     const {selected} = req.body;
//     try {
//         const promises = selected.map(async item => {
//             return await Blog.findByIdAndDelete(item);   
//         })
        
//         // wait until all promises resolve
//         const results = await Promise.all(promises)
//         if(results) {
//             const data = await Blog.find({});
//             res.status(200).json(data);
//         }
//     } catch {
//         res.status(400).json({msg: 'Something went wrong.'});
//     }
    
    
// }
