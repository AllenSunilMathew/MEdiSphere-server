const express = require("express");
const router = express.Router();
const appointmentController = require("../controller/appoinmentController");
const auth = require("../middleware/authMiddleware");

router.post("/appointments", auth, appointmentController.createAppointment);
router.get("/appointments", auth, appointmentController.getAppointments);

module.exports = router;
