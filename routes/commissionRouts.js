const express = require('express');

const commissionController = require('../controllers/commissionController');

const router = express.Router();


router.get('/getCommissions',  commissionController.getCommissions);

router.post('/addCommission',  commissionController.AddCommission);

router.put('/editCommission/:id',  commissionController.UpdateCommission);

router.delete('/deleteCommission/:id',  commissionController.DeleteCommission);

module.exports = router;
