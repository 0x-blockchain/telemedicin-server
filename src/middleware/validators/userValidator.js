const { check } = require("express-validator");

exports.createUserSchema = [
    check('firstname').exists().withMessage("firstname is required"),
    check('lastname').exists().withMessage("lastname is required"),
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