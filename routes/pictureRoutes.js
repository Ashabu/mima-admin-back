const express = require('express');

const pictureController = require('../controllers/pictureController');

const router = express.Router();

router.put('/editPicture', pictureController.UpdatePicture);

router.delete('/deletePicture/:id', pictureController.DeletePicture);

module.exports = router;