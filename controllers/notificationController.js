const Notification = require("../models/Notification");

exports.createNotification = async (req, res) => {
    try {
        const { title, description } = req.body;
        const imagePath = req.file ? req.file.path : null;

        const newNotification = new Notification({ title, description, image: imagePath });
        await newNotification.save();

        res.status(201).json({ message: "Notification created successfully", newNotification });
    } catch (error) {
        res.status(500).json({ message: "Error creating notification", error });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ timestamp: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error });
    }
};
