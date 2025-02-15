const Hotel = require("../models/hotelModel");
const path = require("path");
const fs = require("fs");

exports.createHotel = async (req, res) => {
    try {
        const { hotelName, rating, location } = req.body;
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Hotel image is required" });
        }

        const hotelImage = `uploads/hotelImages/${req.file.filename}`;

        const newHotel = new Hotel({ hotelName, hotelImage, rating, location });
        await newHotel.save();
        res.status(201).json({ success: true, message: "Hotel created successfully", data: newHotel });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating hotel", error: error.message });
    }
};

exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json({ success: true, data: hotels });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching hotels", error: error.message });
    }
};

exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }
        res.status(200).json({ success: true, data: hotel });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching hotel", error: error.message });
    }
};

exports.updateHotel = async (req, res) => {
    try {
        const { hotelName, rating, location } = req.body;
        let updateData = { hotelName, rating, location };

        if (req.file) {
            updateData.hotelImage = `uploads/hotelImages/${req.file.filename}`;
        }

        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedHotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }

        res.status(200).json({ success: true, message: "Hotel updated successfully", data: updatedHotel });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating hotel", error: error.message });
    }
};

exports.deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }

        const imagePath = path.join(__dirname, "..", hotel.hotelImage);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Hotel deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting hotel", error: error.message });
    }
};
