// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const uploadDir = path.join(__dirname, "..", "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   console.log("Created uploads directory at:", uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log("Destination path:", uploadDir);
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(
//       file.originalname
//     )}`;
//     console.log("Generated filename:", uniqueName);
//     cb(null, uniqueName);
//   },
// });

// const uploadConfig = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     console.log("Processing file:", file.originalname);
//     console.log("Mimetype:", file.mimetype);

//     const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type. Only JPEG, PNG & GIF allowed."), false);
//     }
//   },
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// const uploadMiddleware = (req, res, next) => {
//   console.log("Upload middleware started");
//   console.log("Request headers:", req.headers);

//   uploadConfig.single("image")(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       console.error("Multer error:", err);
//       return res.status(400).json({ message: `Upload error: ${err.message}` });
//     } else if (err) {
//       console.error("Other upload error:", err);
//       return res.status(500).json({ message: err.message });
//     }

//     console.log("File upload successful:", req.file);
//     next();
//   });
// };

// module.exports = uploadMiddleware;


// // const multer = require("multer");
// // const path = require("path");
// // const fs = require("fs");

// // // Define the upload directory for hotel images
// // const uploadDir = path.join(__dirname, "..", "uploads", "hotelImages");
// // const uploadDirs = path.join(__dirname, "..", "uploads", "sliderImages");


// // if (!fs.existsSync(uploadDirs)) {
// //     fs.mkdirSync(uploadDirs, { recursive: true });
// //     console.log("Created sliderImages directory at:", uploadDirs);
// // }

// // // Ensure the hotelImages folder exists
// // if (!fs.existsSync(uploadDir)) {
// //     fs.mkdirSync(uploadDir, { recursive: true });
// //     console.log("Created hotelImages directory at:", uploadDir);
// // }

// // // Configure Multer storage
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         console.log("Destination path:", uploadDir);
// //         cb(null, uploadDir);
// //     },
// //     filename: (req, file, cb) => {
// //         const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
// //         console.log("Generated filename:", uniqueName);
// //         cb(null, uniqueName);
// //     },
// // });

// // // Multer upload configuration
// // const uploadConfig = multer({
// //     storage: storage,
// //     fileFilter: (req, file, cb) => {
// //         console.log("Processing file:", file.originalname);
// //         console.log("Mimetype:", file.mimetype);

// //         const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
// //         if (allowedTypes.includes(file.mimetype)) {
// //             cb(null, true);
// //         } else {
// //             cb(new Error("Invalid file type. Only JPEG, PNG & GIF allowed."), false);
// //         }
// //     },
// //     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// // });

// // // Middleware function for handling hotel image uploads
// // const uploadHotelImage = (req, res, next) => {
// //     console.log("Hotel image upload middleware started");

// //     uploadConfig.single("hotelImage")(req, res, (err) => {
// //         if (err instanceof multer.MulterError) {
// //             console.error("Multer error:", err);
// //             return res.status(400).json({ message: `Upload error: ${err.message}` });
// //         } else if (err) {
// //             console.error("Other upload error:", err);
// //             return res.status(500).json({ message: err.message });
// //         }

// //         console.log("Hotel image upload successful:", req.file);
// //         next();
// //     });
// // };

// // const uploadSliderImage = (req, res, next) => {
// //     uploadConfig.single("sliderImage")(req, res, (err) => {
// //         if (err instanceof multer.MulterError) {
// //             return res.status(400).json({ message: `Upload error: ${err.message}` });
// //         } else if (err) {
// //             return res.status(500).json({ message: err.message });
// //         }
// //         next();
// //     });
// // };

// // module.exports = uploadHotelImage;
// // module.exports = uploadSliderImage;


const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define upload directories
const baseUploadDir = path.join(__dirname, "..", "uploads");
const uploadDirs = {
    image: path.join(baseUploadDir, "images"),
    hotelImage: path.join(baseUploadDir, "hotelImages"),
    sliderImage: path.join(baseUploadDir, "sliderImages"),
    notificationImage: path.join(baseUploadDir, "notificationImages"),
};

// Ensure all directories exist
Object.values(uploadDirs).forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log("Created directory:", dir);
    }
});

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destPath = uploadDirs.image; // Default path

        if (file.fieldname === "hotelImage") {
            destPath = uploadDirs.hotelImage;
        } else if (file.fieldname === "sliderImage") {
            destPath = uploadDirs.sliderImage;
        }else if (file.fieldname === "notificationImage"){ 
            destPath = uploadDirs.notificationImage;
        }

        console.log("Destination path:", destPath);
        cb(null, destPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        console.log("Generated filename:", uniqueName);
        cb(null, uniqueName);
    }
});

// Multer upload configuration
const uploadConfig = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log("Processing file:", file.originalname);
        console.log("Mimetype:", file.mimetype);

        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPEG, PNG & GIF allowed."), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Middleware functions for different uploads
const uploadMiddleware = uploadConfig.single("image");
const uploadHotelImage = uploadConfig.single("hotelImage");
const uploadSliderImage = uploadConfig.single("sliderImage");
const uploadNotificationImage = uploadConfig.single("notificationImage");

module.exports = { uploadMiddleware, uploadHotelImage, uploadSliderImage, uploadNotificationImage };
