const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();

    res.status(201).json({ message: "Registration successful", user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "MEDISPHERE_SECRET_KEY", { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.profileController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate({ path: "appointments", options: { sort: { createdAt: -1 } } })
      .populate({ path: "labTests", options: { sort: { createdAt: -1 } } });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Profile fetched", user });
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
