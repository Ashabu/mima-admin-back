const express = require('express');

const affiliateProgramController = require('../controllers/affiliateProgramController');

const router = express.Router();

router.get('/getMainInfo', affiliateProgramController.getAffiliatePrograms);

router.post('/addMainInfo', affiliateProgramController.AddAffiliateProgram);

router.put('/editMainInfo/:id', affiliateProgramController.UpdateAffiliateProgram);

router.delete('/deleteMainInfo/:id', affiliateProgramController.DeleteAffiliateProgram);


module.exports = router;