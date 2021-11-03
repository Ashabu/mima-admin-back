const express = require('express');

const benefitController = require('../controllers/benefitController');

const authMidleware = require('../middleware/authMidleware');

const router = express.Router();

router.get('/getBenefits', benefitController.getBenefits);

router.post('/addBenefit', authMidleware, benefitController.AddBenefit);

router.put('/editBenefit/:id', authMidleware, benefitController.UpdateBenefit);

router.delete('/deleteBenefit/:id', authMidleware, benefitController.DeleteBenefit);


module.exports = router;