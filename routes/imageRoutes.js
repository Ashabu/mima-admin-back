const express = require('express');

const imageController = require('../controllers/imageController');

const router = express.Router();

router.post('/addImage', imageController.AddImage)

router.put('/editImage/:id', imageController.UpdateImage);

router.delete('/deleteImage/:id', imageController.DeleteImage);

module.exports = router;