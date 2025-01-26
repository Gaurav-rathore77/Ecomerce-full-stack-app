const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const requiredSignedin = async (req, res, next) => {
    try {
       
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Unauthorized" });
    }
};
export const isAdmin = async (req, res, next) => {
    try {
      const User = await user.findById(req.user._id);
      if (User.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };

module.exports = { requiredSignedin , isAdmin};
