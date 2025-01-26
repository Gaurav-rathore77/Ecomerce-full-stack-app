const user = require("../models/userModel");
const { hashPassword } = require("../helper/authHelper");
const {comparePassword} = require("../helper/authHelper");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const { username, email, password, phone, address } = req.body; // Ensure these field usernames match the input
        console.log(req.body);

        // Validate required fields
        if (!username || !email || !password || !phone || !address) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create and save the new user
        const newUser = new user({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
        });
        console.log(newUser);

        await newUser.save();

        res.status(200).json({ message: "User registered successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const User = await user.findOne({ email, answer });
      //validation
      if (!User) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await user.findByIdAndUpdate(User._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };



const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const User = await user.findOne({ email });
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await comparePassword(password, User.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ _id: User._id }, process.env.JWT_SECRET,{expiresIn:"7d"});
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        // });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              adddress: user.address,
            },
            token,
          });
        // res.status(200).json({ message: "Login successful", success: true,token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
const testController = async (req, res) => {
    try {
        res.status(200).json({ message: "Test successful", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { loginController , registerController ,testController ,forgotPasswordController};
