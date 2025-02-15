// routes/sliderRoutes.js
const express = require("express");
const router = express.Router();
const sliderController = require("../controllers/sliderController");
const {uploadSliderImage} = require("../middleware/multerConfig");


router.post("/upload", uploadSliderImage, sliderController.uploadSliderImage);
router.get("/", sliderController.getAllSliderImages);
router.delete("/:id", sliderController.deleteSliderImage);


module.exports = router;