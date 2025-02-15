const express = require("express");
const router = express.Router();
const { uploadNotificationImage } = require("../middleware/multerConfig");
const notificationController = require("../controllers/notificationController");

router.post("/", uploadNotificationImage, notificationController.createNotification);
router.get("/", notificationController.getNotifications);

module.exports = router;
