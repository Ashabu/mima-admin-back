const express = require('express');

const faqController = require('../controllers/faqController');

const authMidleware = require('../middleware/authMidleware');

const router = express.Router();


router.get('/getFaqs', faqController.getFaqs);

router.post('/addFaq', authMidleware, faqController.AddFaq);

router.put('/editFaq/:id', authMidleware, faqController.UpdateFaq);

router.delete('/deleteFaq/:id', authMidleware, faqController.DeleteFaq);

module.exports = router;
