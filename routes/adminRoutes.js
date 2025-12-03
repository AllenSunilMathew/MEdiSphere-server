const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const adminCtrl = require("../controller/adminController");

// Admin Protected Routes
router.get("/users", auth, isAdmin, adminCtrl.getAllUsers);
router.delete("/users/:id", auth, isAdmin, adminCtrl.deleteUser);
router.put("/users/:id/role", auth, isAdmin, adminCtrl.updateUserRole);
router.get("/dashboard", auth, isAdmin, adminCtrl.getDashboardCounts);

module.exports = router;
