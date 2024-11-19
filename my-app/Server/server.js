const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return  cb(null, './uploads'); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}- ${file.originalname}`); // Use timestamp as filename
  }
});

// where uplaoded data is going on
const upload = multer({ storage});

app.use(express.urlencoded({ extended : false}));


// Create the upload endpoint
app.post("/upload", upload.single("filedata"), (req, res) => {
  // if (!req.file) {
  //   return res.status(400).json({ message: 'No file uploaded' });
  // }
  console.log(req.body);
  console.log(req.file); 
  res.status(200).json({ message: 'File uploaded successfully', filePath: req.file.path });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
