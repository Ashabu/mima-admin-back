const express = require('express');

const imageController = require('../controllers/imageController');

const authMidleware = require('../middleware/authMidleware');

const router = express.Router();

router.post('/addImage', authMidleware, imageController.AddImage)

router.put('/editImage/:id', authMidleware, imageController.UpdateImage);

router.delete('/deleteImage/:id', authMidleware, imageController.DeleteImage);

module.exports = router;