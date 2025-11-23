const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    phone: { type: String, required: true },
    doctor: { type: String, required: true },
    date: { type: String, required: true }, // store as ISO date string if you prefer
    time: { type: String, required: true },
    symptoms: { type: String },
    tokenNumber: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
