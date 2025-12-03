const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Make sure this line exists

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

mongoose.connect(process.env.DBCONNECTIONSTRING)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

// routes
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appoinmentRoutes");
const labRoutes = require("./routes/labRoutes");
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);



app.use("/api", userRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", labRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
