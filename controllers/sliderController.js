// controllers/sliderController.js
const Slider = require("../models/sliderModel");
const fs = require("fs");
const path = require("path");

// POST - Upload a new slider image
const uploadSliderImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const newSlider = new Slider({
            image: req.file.path,
        });

        await newSlider.save();
        res.status(201).json({ message: "Slider image uploaded successfully", slider: newSlider });
    } catch (error) {
        console.error("Error uploading slider image:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// GET - Fetch all slider images
const getAllSliderImages = async (req, res) => {
    try {
        const sliders = await Slider.find().sort({ createdAt: -1 });
        res.status(200).json(sliders);
    } catch (error) {
        console.error("Error fetching slider images:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE - Delete a slider image
const deleteSliderImage = async (req, res) => {
    try {
        const slider = await Slider.findById(req.params.id);
        if (!slider) {
            return res.status(404).json({ message: "Slider image not found" });
        }

        // Delete the image file from the server
        const imagePath = path.join(__dirname, "..", slider.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await Slider.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Slider image deleted successfully" });
    } catch (error) {
        console.error("Error deleting slider image:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    uploadSliderImage,
    getAllSliderImages,
    deleteSliderImage,
};