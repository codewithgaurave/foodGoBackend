// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const otpRoutes = require('./routes/otpRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const notificationRoutes = require("./routes/notificationRoutes");

const path = require("path");



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use('/api/otp', otpRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/notifications", notificationRoutes);


app.get("/", (req, res) => {
  res.send("API is running successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
