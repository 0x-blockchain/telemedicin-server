const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const hashPassword = require("../utils/common.utils");
const dotenv = require("dotenv");
dotenv.config();

/*******Auth Controller************/

const createUserWithEmail = async (req, res, next) => {
  checkValidation(req, res);
  // Check exist
  const { fname, lname, email, role, number } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'This Email already exist' });
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
        id: user.id
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
    return res.status(500).json({ msg: 'Something went wrong' });
  }
};

//login handler
const userLoginWithEmail = async (req, res, next) => {

  checkValidation(req, res);
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: 'Email is not verified' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: 'Incorrect account or password' });
    }

    const payload = {
      user: {
        id: user.id
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
    const authHeader = req;
    console.log(authHeader);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Something went wrong' });
  }
};


//check validation express-validator
const checkValidation = (req, res) => {
  const errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: 'Validation faild' });
  }
};


/****Export******/
module.exports = {
  createUserWithEmail,
  userLoginWithEmail
};
