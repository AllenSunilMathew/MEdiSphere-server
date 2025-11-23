const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Invalid token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "MEDISPHERE_SECRET_KEY");
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};
