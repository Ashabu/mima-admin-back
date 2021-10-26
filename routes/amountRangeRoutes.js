const express = require('express');

const amountRangeController = require('../controllers/amountRangeController');

const router = express.Router();




router.post('/addAmountRange', amountRangeController.AddAmountRange);

router.put('/eidtAmountRange/:id', amountRangeController.UpdateAomountRange);

router.delete('/deleteAmountRange/:id', amountRangeController.DeleteAmountRange)

module.exports = router;