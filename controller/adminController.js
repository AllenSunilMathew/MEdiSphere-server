const User = require("../models/userModels");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appoinmentModel");
const LabTest = require("../models/labTestModel");
// Get all Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Change User Role
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
    res.json({ message: "Role updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



// Dashboard Count
exports.getDashboardCounts = async (req, res) => {
  try {
    // total users (include admins if you want overall user count)
    const totalUsers = await User.countDocuments({}); // or { role: "user" } if you want only users
    // total doctors
    const totalDoctors = await Doctor.countDocuments({});
    // total appointments
    const totalAppointments = await Appointment.countDocuments({});
    // total lab tests
    const totalLabTests = await LabTest.countDocuments({});

    return res.json({
      totalUsers,
      totalDoctors,
      totalAppointments,
      totalLabTests,
    });
  } catch (err) {
    console.error("Admin Dashboard Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};