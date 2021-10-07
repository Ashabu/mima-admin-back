const express = require('express');

const benefitController = require('../controllers/bennefitController');

const router = express.Router();

router.get('/getBenefits', benefitController.getBenefits);

router.post('/addBenefit', benefitController.AddBenefit);

router.put('/editBenefit/:id', benefitController.UpdateBenefit);

router.delete('/deleteBenefit/:id', benefitController.DeleteBenefit);


module.exports = router;