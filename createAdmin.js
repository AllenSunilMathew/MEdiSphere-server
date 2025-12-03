// scripts/createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");

async function create() {
  await mongoose.connect(process.env.DBCONNECTIONSTRING || "mongodb://localhost:27017/yourdb");
  const email = "adminmedisphere@gmail.com";
  const plain = "admin123";

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashed = await bcrypt.hash(plain, 10);
  const admin = new Admin({ email, password: hashed, role: "admin" });
  await admin.save();
  console.log("Admin created:", email);
  process.exit();
}

create().catch((e) => { console.error(e); process.exit(1); });
