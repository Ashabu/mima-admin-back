const express = require('express');

const commissionController = require('../controllers/commissionController');

const authMidleware = require('../middleware/authMidleware');

const router = express.Router();


router.get('/getCommissions',  commissionController.GetCommissions);

router.post('/addCommission', authMidleware, commissionController.AddCommission);

router.put('/editCommission/:id', authMidleware, commissionController.UpdateCommission);

router.delete('/deleteCommission/:id', authMidleware, commissionController.DeleteCommission);

module.exports = router;
