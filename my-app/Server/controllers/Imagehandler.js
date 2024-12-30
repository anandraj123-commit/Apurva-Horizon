const multer = require('multer');
const path = require('path');
// const mongoose = require('mongoose');
const File = require("../models/content-type-model") // Ensure you have a File model in place

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, './uploads/otherfiles');
    } else if (['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.mimetype)) {
      cb(null, './uploads/images');
    } else {
      cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configure multer with dynamic size limits and file filtering
const upload = multer({
  storage,
  limits: {
    fileSize: (req, file, cb) => {
      if (file.mimetype === 'application/pdf' && file.size > 100 * 1024) {
        return cb(new Error('PDF file must be less than 100KB'));
      } else if (
        ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.mimetype) &&
        file.size > 32 * 1024
      ) {
        return cb(new Error('Image file must be less than 32KB'));
      }
      cb(null, true);
    },
  },
  fileFilter: (req, file, cb) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
    if (validTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
    }
  },
});

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = new File({ fileName: req.file.filename });
    await file.save();

    res.status(200).json({
      message: 'File uploaded successfully',
      filePath: `/uploads/${req.file.filename}`,
    });
  } catch (err) {
    console.error('Error during file upload:', err);
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size exceeds limit' });
    }
    res.status(500).json({ message: 'Failed to upload file' });
  }
};

module.exports = { upload , uploadFile };
