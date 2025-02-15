const express = require("express");
const router = express.Router();
const {uploadHotelImage} = require("../middleware/multerConfig");
const {
    createHotel,
    getAllHotels,
    getHotelById,
    updateHotel,
    deleteHotel
} = require("../controllers/hotelController");

router.post("/", uploadHotelImage, createHotel);
router.get("/", getAllHotels);
router.get("/:id", getHotelById);
router.put("/:id", uploadHotelImage, updateHotel);
router.delete("/:id", deleteHotel);

module.exports = router;
