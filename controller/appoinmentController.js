const Appointment = require("../models/appoinmentModel");
const User = require("../models/userModels");

exports.createAppointment = async (req, res) => {
  try {
    const { patientName, phone, doctor, date, time, symptoms } = req.body;
    if (!patientName || !phone || !doctor || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Sequential token generation per doctor + date:
    // Find appointment with highest token for same doctor + date
    const last = await Appointment.findOne({ doctor, date }).sort({ tokenNumber: -1 }).select("tokenNumber");
    const nextToken = last && last.tokenNumber ? last.tokenNumber + 1 : 1;

    const appointment = await Appointment.create({
      patientName,
      phone,
      doctor,
      date,
      time,
      symptoms,
      tokenNumber: nextToken,
      user: req.user._id
    });

    // push to user's appointments array
    await User.findByIdAndUpdate(req.user._id, { $push: { appointments: appointment._id } });

    // Optional SMS (Twilio) - uncomment and configure env to enable
    /*
    const twilioClient = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
    await twilioClient.messages.create({
      body: `Hello ${patientName}, your appointment is confirmed. Doctor: ${doctor}. Date: ${date} Time: ${time}. Token: ${nextToken}`,
      from: process.env.TWILIO_PHONE,
      to: `+91${phone}`
    });
    */

    res.json({ message: "Appointment created", appointment });
  } catch (err) {
    console.error("CreateAppointment Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    // if user present, return user's appointments
    if (req.user) {
      const appointments = await Appointment.find({ user: req.user._id }).sort({ createdAt: -1 });
      return res.json({ message: "User appointments", appointments });
    }
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json({ message: "All appointments", appointments });
  } catch (err) {
    console.error("GetAppointments Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
exports.bookAppointment = async (req, res) => {
  try {
    const { doctor, patientName, date, time } = req.body;

    // find last token for SAME DOCTOR + SAME DATE
    const lastAppointment = await Appointment.findOne({ doctor, date })
      .sort({ tokenNumber: -1 });

    let newToken = 1;
    if (lastAppointment) {
      newToken = lastAppointment.tokenNumber + 1;
    }

    const appointment = await Appointment.create({
      doctor,
      patientName,
      date,
      time,
      tokenNumber: newToken,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      appointment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

