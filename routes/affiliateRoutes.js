const express = require('express');

const affiliateController = require('../controllers/affiliateController');

const router = express.Router();

router.get('/getAffiliate', affiliateController.GetAffiliate);

router.post('/addAffiliate', affiliateController.AddAffiliate);

router.put('/editAffiliate/:id', affiliateController.UpdateAffiliate);

router.delete('/deleteAffiliate/:id', affiliateController.DeleteAffiliate);


module.exports = router;