const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Created uploads directory at:", uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Destination path:", uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    console.log("Generated filename:", uniqueName);
    cb(null, uniqueName);
  },
});

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
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadMiddleware = (req, res, next) => {
  console.log("Upload middleware started");
  console.log("Request headers:", req.headers);

  uploadConfig.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res.status(400).json({ message: `Upload error: ${err.message}` });
    } else if (err) {
      console.error("Other upload error:", err);
      return res.status(500).json({ message: err.message });
    }

    console.log("File upload successful:", req.file);
    next();
  });
};

module.exports = uploadMiddleware;
