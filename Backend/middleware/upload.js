const multer = require("multer");

const upload = multer({
  // Vercel functions have an ephemeral, read-only deployment filesystem.
  // Keep uploads in memory and stream them to persistent image storage.
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed."));
    }
    cb(null, true);
  },
});

module.exports = upload;
