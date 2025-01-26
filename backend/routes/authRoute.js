const express = require("express");
const {registerController, forgotPasswordController} = require("../controller/authController");
const {loginController} = require("../controller/authController");
const {testContrller} = require("../controller/authController");
const {isAdmin} = require("../middleware/authMiddleware");
const requiredSignedin = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test",requiredSignedin,isAdmin, testContrller);
router.post("/forgot-password", forgotPasswordController);
router.post("/user-auth", requiredSignedin, (req, res) => {
    res.status(200).send({ ok: true });
});

module.exports = router;