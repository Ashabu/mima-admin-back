const express = require('express');

const testimonialController = require('../controllers/testimonialController');

const router = express.Router();

router.get('/gettestimonials', testimonialController.getTestimonials);

router.post('/addTestimonial', testimonialController.AddTestimonial);

router.put('/editTestimonial/:id', testimonialController.UpdateTestimonial);

router.delete('/deleteTestimonial/:id', testimonialController.DeleteTestimonial);


module.exports = router;