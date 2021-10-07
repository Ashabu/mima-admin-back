const express = require('express');

const partnerController = require('../controllers/partnerController');

const router = express.Router();

router.get('/getPartners', partnerController.getPartners);

router.post('/addPartner', partnerController.AddPartner);

router.put('/editPartner/:id', partnerController.UpdatePartner);

router.delete('/deletePartner/:id', partnerController.DeletePartner);


module.exports = router;