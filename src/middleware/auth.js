const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = () => {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const bearer = "Bearer ";
      if (!authHeader) {
        throw new HttpException(401, "Access denied. No credentials sent!");
      }
      const token = authHeader.replace(bearer, "");
      //Verify Token
      const decoded = jwt.verify(token, process.env.SECRET_JWT);
      
      const user_data = await UserModel.findById(decoded.user.id);
      if (!user_data) {
        throw new HttpException(401, "Authentication failed!");
      }
      // //if the user has permissions
      req.body.currentUser = user_data.user.id;
      next();
    } catch (e) {
      e.status = 401;
      res.redirect("/login");
    }
  };
};

module.exports = auth;
