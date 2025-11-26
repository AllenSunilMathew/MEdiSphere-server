const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../middleware/authMiddleware");

router.post("/register", userController.registerController);
router.post("/login", userController.loginController);
router.get("/profile", auth, userController.profileController);

module.exports = router;
