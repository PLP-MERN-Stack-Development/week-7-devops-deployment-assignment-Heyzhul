const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const router = express.Router();
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage });

// Upload route
router.post('/', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

module.exports = router;
