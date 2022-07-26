module.exports = function(app) {
  
  const authController = require("../controllers/authController");
  const appointmentController = require('../controllers/appointment');
  const doctorsController = require('../controllers/doctors');
  const userController = require("../controllers/userController");
  const articleController = require("../controllers/articleController");
  const ticketController = require("../controllers/ticketController");

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
  app.post('/api/doctors/search', doctorsController.searchDoctors);
  app.get('/api/doctors/profile/:email', doctorsController.selectOneWithEmail);
  app.post('/api/doctors/profile', doctorsController.postDcotorProfile);

//   // article routes
//   app.get('/article', auth(), articleController.listAll);
//   app.get('/article/:id', auth(),articleController.getObjectById);

//   // user routes
//   app.get('/user', auth(), userController.listAll);
//   app.get('/user/:id', auth(),userController.getObjectById);

//   // ticket routes
//   app.get('/ticket', auth(), ticketController.listAll);
//   app.get('/ticket/:id', auth(), ticketController.getObjectById);
};
