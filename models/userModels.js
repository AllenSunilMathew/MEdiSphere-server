const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    labTests: [{ type: mongoose.Schema.Types.ObjectId, ref: "LabTest" }],
    bookings: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
