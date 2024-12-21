const express = require('express');
const { upload, uploadFile } = require('../controllers/Imagehandler'); // Assuming upload and uploadFile are exported from your controller
const router = express.Router();

// Upload route
router.post('/upload', upload.single('filedata'), uploadFile);

module.exports = router;
