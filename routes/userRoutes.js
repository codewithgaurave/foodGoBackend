const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateProfile,
  updatePassword,
  getUserById,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const {uploadMiddleware} = require("../middleware/multerConfig");

const router = express.Router();

router.post("/register", uploadMiddleware, registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.put("/profile", protect, uploadMiddleware, updateProfile);
router.put("/password", protect, updatePassword);
router.get("/:id", protect, getUserById);

router.post("/test-upload", uploadMiddleware, (req, res) => {
  if (req.file) {
    res.json({
      message: "File uploaded successfully",
      file: req.file,
    });
  } else {
    res.status(400).json({
      message: "No file uploaded",
    });
  }
});

module.exports = router;