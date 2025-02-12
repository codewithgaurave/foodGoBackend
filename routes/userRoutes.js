const express = require("express");
const { registerUser, loginUser, getToken, logoutUser, getUserById, updateUserById } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/token", protect, getToken); 
router.post("/logout", protect, logoutUser); 
router.get("/:id", getUserById); 
router.put("/:id", updateUserById); 

module.exports = router;
