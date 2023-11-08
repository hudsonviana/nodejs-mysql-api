const express = require('express');
const imageController = require('../controllers/image.controller');
const imageUploder = require('../helpers/image-uploader');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post(
  '/uploads',
  checkAuth.checkAuth,
  imageUploder.upload.single('image'),
  imageController.upload
);

module.exports = router;
