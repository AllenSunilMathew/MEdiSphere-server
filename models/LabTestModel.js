const mongoose = require("mongoose");

const labTestSchema = new mongoose.Schema(
  {
    test: { type: String, required: true },
    price: { type: Number, required: true },
    patientName: { type: String },
    date: { type: String },
    time: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LabTest", labTestSchema);
