const LabTest = require("../models/labTestModel");
const User = require("../models/userModels");

exports.createLabTest = async (req, res) => {
  try {
    const { test, price, patientName, date, time } = req.body;
    if (!test || !price) return res.status(400).json({ message: "Missing fields" });

    const lab = await LabTest.create({
      test,
      price,
      patientName,
      date,
      time,
      user: req.user._id
    });

    await User.findByIdAndUpdate(req.user._id, { $push: { labTests: lab._id } });

    res.json({ message: "Lab test created", lab });
  } catch (err) {
    console.error("CreateLabTest Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getUserLabTests = async (req, res) => {
  try {
    const labs = await LabTest.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ message: "User lab tests", labs });
  } catch (err) {
    console.error("GetUserLabTests Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
