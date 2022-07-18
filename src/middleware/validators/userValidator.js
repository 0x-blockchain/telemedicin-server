const { check } = require("express-validator");

exports.createUserSchema = [
    check('fname').exists().withMessage("fname is required"),
    check('lname').exists().withMessage("lname is required"),
    check('email')
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Must be a valid email")
        .normalizeEmail(),
    check('number').exists().withMessage("phone number is required"),
    check('password')
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Password must contain at least 8 characters"),
];

exports.validateLogin = [
    check("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Must be a valid email")
        .normalizeEmail(),
    check("password").exists().withMessage("Password is required"),
];