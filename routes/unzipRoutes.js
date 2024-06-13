const express = require('express');
const router = express.Router();
const dbController = require('../controllers/unzipController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('zipFile'), dbController.uploadFile);

module.exports = router;