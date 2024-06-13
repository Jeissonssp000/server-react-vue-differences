const express = require('express');
const router = express.Router();
const unzipController = require('../controllers/unzipController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('zipFile'), unzipController.uploadFile);

module.exports = router;