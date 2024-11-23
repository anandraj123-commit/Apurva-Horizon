const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS for all routes (useful for frontend running on a different port)
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL
}));

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/Apurva-horizon', {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for uploaded files
const fileSchema = new mongoose.Schema({
  fileName: String,
  uploadDate: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema, 'uploadfile');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check the file type and set the destination folder accordingly
    if (file.mimetype === 'application/pdf') {
      cb(null, './uploads/otherfiles'); // PDF files go to /uploads/otherfiles
    } else if (['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.mimetype)) {
      cb(null, './uploads/images'); // Image files go to /uploads/images
    } else {
      cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

// Configure file filtering and size limits dynamically based on file type
const upload = multer({
  storage,
  limits: {
    fileSize: (req, file, cb) => {
      // Check the file type to apply the correct size limit
      if (file.mimetype === 'application/pdf') {
        // Set 100KB limit for PDF files
        if (file.size > 100 * 1024) {
          return cb(new Error('PDF file must be less than 100KB'));
        }
      } else if (['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.mimetype)) {
        // Set 32KB limit for image files
        if (file.size > 32 * 1024) {
          return cb(new Error('Image file must be less than 32KB'));
        }
      } else {
        return cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create the upload endpoint
app.post('/upload', upload.single('filedata'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Save file name to MongoDB
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
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
