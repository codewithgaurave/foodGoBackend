const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);
