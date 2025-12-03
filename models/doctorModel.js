const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    qualification: { type: String, default: "" },
    experience: { type: Number, default: 0 },
    image: { type: String, default: "" },
    consultationFee: { type: Number, default: 0 },
    status: { type: String, default: "active" } // active / inactive
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
