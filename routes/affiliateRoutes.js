const express = require('express');

const affiliateController = require('../controllers/affiliateController');

const authMidleware = require('../middleware/authMidleware');

const router = express.Router();

router.get('/getAffiliate', affiliateController.GetAffiliate);

router.post('/addAffiliate', authMidleware, affiliateController.AddAffiliate);

router.put('/editAffiliate/:id', authMidleware, affiliateController.UpdateAffiliate);

router.delete('/deleteAffiliate/:id', authMidleware, affiliateController.DeleteAffiliate);


module.exports = router;