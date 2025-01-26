const express = require("express");
const {
  registerController,
  forgotPasswordController,
  loginController,
  testController, // Fixed typo: 'testContrller' to 'testController'
} = require("../controller/authController");
const { isAdmin, requiredSignedin } = require("../middleware/authMiddleware"); // Adjusted imports for consistency

const router = express.Router();

// Define routes
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test", requiredSignedin, isAdmin, testController);
router.post("/forgot-password", forgotPasswordController);
router.get("/user-auth", requiredSignedin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;