const express = require('express');

const affiliateProgramController = require('../controllers/affiliateProgramController');

const router = express.Router();

router.get('/getPartners', affiliateProgramController.getAffiliatePrograms);

router.post('/addPartner', affiliateProgramController.AddAffiliateProgram);

router.put('/editPartner/:id', affiliateProgramController.UpdateAffiliateProgram);

router.delete('/deletePartner/:id', affiliateProgramController.DeleteAffiliateProgram);


module.exports = router;