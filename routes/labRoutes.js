const express = require("express");
const router = express.Router();
const labController = require("../controller/labController");
const auth = require("../middleware/authMiddleware");

router.post("/labs", auth, labController.createLabTest);
router.get("/labs", auth, labController.getUserLabTests);

module.exports = router;
