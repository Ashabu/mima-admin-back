const express = require('express');

const partnerController = require('../controllers/partnerController');

const authMidleware = require('../middleware/authMidleware');

const router = express.Router();

router.get('/getPartners', partnerController.getPartners);

router.post('/addPartner', authMidleware, partnerController.AddPartner);

router.put('/editPartner/:id', authMidleware, partnerController.UpdatePartner);

router.delete('/deletePartner/:id', authMidleware, partnerController.DeletePartner);


module.exports = router;