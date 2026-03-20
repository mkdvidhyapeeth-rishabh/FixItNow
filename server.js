const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/fixitnow");

let users = [];

app.post("/signup", (req, res) => {
  users.push(req.body);
  res.json({ message: "User created" });
});

// OTP simulation
let otpStore = {};

app.post("/send-otp", (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[req.body.aadhaar] = otp;
  console.log("OTP:", otp);
  res.json({ success: true });
});

app.post("/verify-otp", (req, res) => {
  const { aadhaar, otp } = req.body;

  if (otpStore[aadhaar] == otp) {
    res.json({ verified: true });
  } else {
    res.json({ verified: false });
  }
});

// SOCKET.IO tracking
io.on("connection", (socket) => {
  socket.on("location-update", (data) => {
    socket.broadcast.emit("worker-location", data);
  });
});

server.listen(5000, () => console.log("Server running"));
