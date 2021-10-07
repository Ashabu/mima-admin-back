const express = require('express');

const faqController = require('../controllers/faqController');

const router = express.Router();


router.get('/getFaqs', faqController.getFaqs);

router.post('/addFaq', faqController.AddFaq);

router.put('/editFaq/:id', faqController.UpdateFaq);

router.delete('/deleteFaq/:id', faqController.DeleteFaq);

module.exports = router;
