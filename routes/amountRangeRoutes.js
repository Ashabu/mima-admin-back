const express = require('express');

const amountRangeController = require('../controllers/amountRangeController');

const authMidleware = require('../middleware/authMidleware');

const router = express.Router();




router.post('/addAmountRange', authMidleware, amountRangeController.AddAmountRange);

router.put('/eidtAmountRange/:id', authMidleware, amountRangeController.UpdateAomountRange);

router.delete('/deleteAmountRange/:id', authMidleware, amountRangeController.DeleteAmountRange)

module.exports = router;