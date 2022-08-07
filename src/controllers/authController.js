const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpException = require('../utils/HttpException');
const { sendConfirmationEmail } = require('../utils/verfification');
const hashPassword = require("../utils/common.utils");
const dotenv = require("dotenv");
dotenv.config();


const createUserWithEmail = async (req, res) => {
  checkValidation(req, res);

  const { fname, lname, email, role, number } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({type: "failed", msg: 'Email already registered!.'})
    }
    await hashPassword(req);
    const password = req.body.password;
    
    user = new User({
        fname,
        lname,
        email,
        password,
        number,
        role
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fname: user.fname,
        lname: user.lname,
      }
    };

    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.send({ type: "success", msg: "Signup successfully submitted.", token, role });
      }
    );
  } catch (err) {
    return res.status(500).json({ type: "failed", msg: 'Something went wrong.'});
  }
};

//login handler
const userLoginWithEmail = async (req, res, next) => {

  checkValidation(req, res);
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ type: "failed", msg: 'Email is not verified' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ type: "failed", msg: 'Incorrect account or password' });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fname: user.fname,
        lname: user.lname,
      }
    };

    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.send({ type: "success", message: "successful", token });
      }
    );
  } catch (err) {
    return res.status(500).json({ type: "failed", msg: 'Something went wrong' });
  }
};


//forgot Password handler
const forgotPassword = async (req, res, next) => {

    checkValidation(req, res);
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ type: "failed", msg: 'Unregestered Account' });
        }

        const random = Math.floor(Math.random() * 100 + 54);

        const userToken = jwt.sign({ email: email }, process.env.SECRET_JWT, {
            expiresIn: "365d",
        });
        const nodemailer = await sendConfirmationEmail(email, random, userToken);

        if (!nodemailer.state) {
            throw new HttpException(500, "Something went wrong with nodemailer");
        }

        res.send({ type: "success", message: "We sent URL to your mail inbox", token: nodemailer.token });

    } catch (err) {
        return res.status(500).json({ type: "failed", msg: 'Something went wrong' });
    }
};

//check validation express-validator
const checkValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ type: "failed", msg: 'Validation faild' });
  }
};


/****Export******/
module.exports = {
  createUserWithEmail,
  userLoginWithEmail,
  forgotPassword
};
