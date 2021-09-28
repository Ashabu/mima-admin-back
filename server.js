const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require("cors");


const router = express.Router();
const server = express((req, res) => {
  res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ a: 1 }));
});


const db = require('./database/models/');
const faqController = require('./controllers/faqController');
const testimonialController = require('./controllers/testimonialController');

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


server.get('/faqs', faqController.getFaqs);
server.post('/addFaq', faqController.AddFaq);
server.put('/editFaq/:id', faqController.UpdateFaq);
server.delete('/deleteFaq/:id', faqController.DeleteFaq);


server.get('/testimonials', testimonialController.getTestimonials);
server.post('/addTestimonial', testimonialController.AddTestimonial);
server.put('/editTestimonial/:id', testimonialController.UpdateTestimonial);
server.delete('/deleteTestimonial/:id', testimonialController.DeleteTestimonial);



const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server Listening On Port ${PORT}...`);
});