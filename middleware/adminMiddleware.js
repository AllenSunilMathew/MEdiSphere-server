const jwt = require("jsonwebtoken");
const admin = require("../models/adminModel");


// assumes authMiddleware already ran and set req.user = { id, role, ... }
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
