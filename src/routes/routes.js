module.exports = function(app) {
  
    const authController = require("../controllers/authController");
    const appointmentController = require('../controllers/appointment');
    const doctorsController = require('../controllers/doctors');
    const newsletterController = require('../controllers/newsletter');
    const feedbackController = require('../controllers/feedback');
    const blogController = require('../controllers/blogs');
    const commentsController = require('../controllers/comments');
  
//   const userController = require("../controllers/userController");

  const {
    createUserSchema,
    validateLogin
  } = require("../middleware/validators/userValidator");

  const auth = require('../middleware/auth');

  const awaitHandlerFactory = require("../middleware/awaitHandlerFactory");

  //auth routes
  app.post('/api/auth/register', 
    createUserSchema,
    awaitHandlerFactory(authController.createUserWithEmail)
  );
  app.post('/api/auth/login',
    validateLogin,
    awaitHandlerFactory(authController.userLoginWithEmail)
  );
  app.post('/api/auth/forgot-password', awaitHandlerFactory(authController.forgotPassword))

  // Appointment

  app.post('/api/appointment', appointmentController.postAppointment);
  app.post('/api/appointment/delete', appointmentController.deleteAppointment);
  app.get('/api/appointment', appointmentController.listAll);
  app.get('/api/appointment/:id', appointmentController.getObjectById);


  // Doctors
  app.get('/api/doctors', doctorsController.listAll);
  app.get('/api/doctors/:id', doctorsController.selectOne);
  app.post('/api/doctors/search', doctorsController.searchDoctors);
  app.get('/api/doctors/profile/:email', doctorsController.selectOneWithEmail);
  app.post('/api/doctors/profile', doctorsController.postDcotorProfile);


  // NewsLetter
  app.post('/api/newsletter/add', newsletterController.createOne);

  // Feedback
  app.post('/api/feedback/add', feedbackController.createOne);


  // Blog
  app.post('/api/blogs/add', blogController.postBlog);
  app.post('/api/blogs/update', blogController.updateBlog);
  app.post('/api/blogs/search', blogController.searchBlog);
  app.post('/api/blogs/delete', blogController.deleteBlog);
  app.get('/api/blogs/:id', blogController.listById);
  app.get('/api/blogs/home/latest', blogController.latestBlogs);
  app.get('/api/blogs/edit/:id', blogController.getObjectById);
  app.get('/api/blogs/show/:id', blogController.getObjectsSerials);

  /**
   * comments controller
   */
  app.post('/api/comments/add', commentsController.postComment);
  app.get('/api/comments/:id', commentsController.getCommentsById);
  app.post('/api/comments/up', commentsController.upCommentById);
  app.post('/api/comments/down', commentsController.downCommentById);
};
