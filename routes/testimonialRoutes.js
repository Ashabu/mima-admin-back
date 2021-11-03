const express = require('express');

const testimonialController = require('../controllers/testimonialController');

const authMidleware = require('../middleware/authMidleware');

const router = express.Router();

router.get('/gettestimonials', testimonialController.getTestimonials);

router.post('/addTestimonial', authMidleware, testimonialController.AddTestimonial);

router.put('/editTestimonial/:id', authMidleware, testimonialController.UpdateTestimonial);

router.delete('/deleteTestimonial/:id',authMidleware, testimonialController.DeleteTestimonial);


module.exports = router;