const { check } = require("express-validator");

exports.createUserSchema = [
    check('name').exists().withMessage("username is required"),
    check('email')
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Must be a valid email")
        .normalizeEmail(),
    check('role')
        .exists()
        .withMessage("Region is required"),
    check('password')
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Password must contain at least 8 characters"),
    check('region').exists().withMessage("region is required"),
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