const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require("cors");
require("dotenv").config();
const authMidleware = require('./middleware/authMidleware');


const router = express.Router();
const server = express();

server.use(cors({ origin: true, credentials: true }));


const faqController = require('./controllers/faqController');
const testimonialController = require('./controllers/testimonialController');
const userController = require('./controllers/userController');
const affiliateProgramController = require('./controllers/affiliateProgramController');
const benefitController = require('./controllers/benefitController');
const commissionController = require('./controllers/commissionController');
const mainBannerController = require('./controllers/mainBanerController');
const partnerController = require('./controllers/partnerController');



server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

server.get('/getMainInfo', authMidleware, mainBannerController.getMainBanner);
server.post('/addInfo', authMidleware, mainBannerController.AddMainBanner);
server.put('/editInfo/:id', authMidleware, mainBannerController.UpdateMainBanner);
// server.delete('/deleteInfo/:id', authMidleware, mainBannerController.DeleteMainBanner);

server.get('/getBenefits', authMidleware, benefitController.getBenefits);
server.post('/addBenefit', authMidleware, benefitController.AddBenefit);
server.put('/editBenefit/:id', authMidleware, benefitController.UpdateBenefit);
server.delete('/deleteBenefit/:id', authMidleware, benefitController.DeleteBenefit);

server.get('/getCommisions', authMidleware, commissionController.getCommissions);
server.post('/addCommission', authMidleware, commissionController.AddCommission);
server.put('/editCommission/:id', authMidleware, commissionController.UpdateCommission);
server.delete('/deleteCommission/:id', authMidleware, commissionController.DeleteCommission);

server.get('/getTestimonials', authMidleware, testimonialController.getTestimonials);
server.post('/addTestimonial', authMidleware, testimonialController.AddTestimonial);
server.put('/editTestimonial/:id', authMidleware, testimonialController.UpdateTestimonial);
server.delete('/deleteTestimonial/:id', authMidleware, testimonialController.DeleteTestimonial);

server.get('/getAffiliate', authMidleware, affiliateProgramController.getAffiliatePrograms);
server.post('/addAffiliate', authMidleware, affiliateProgramController.AddAffiliateProgram);
server.put('/editAffiliate/:id', authMidleware, affiliateProgramController.UpdateAffiliateProgram);
server.delete('/deleteAffiliate/:id', authMidleware, affiliateProgramController.DeleteAffiliateProgram);

server.get('/getFaqs', authMidleware, faqController.getFaqs);
server.post('/addFaq', authMidleware, faqController.AddFaq);
server.put('/editFaq/:id', authMidleware, faqController.UpdateFaq);
server.delete('/deleteFaq/:id', authMidleware, faqController.DeleteFaq);

server.get('/getPartners', authMidleware, partnerController.getPartners);
server.post('/addPartner', authMidleware, partnerController.AddPartner);
server.put('/editPartner/:id', authMidleware, partnerController.UpdatePartner);
server.delete('/deletePartner/:id', authMidleware, partnerController.DeletePartner);

server.get('/getUsers', authMidleware, userController.getUsers);
server.post('/signUp', authMidleware, userController.singUp);
server.post('/signIn', authMidleware, userController.signIn);









const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server Listening On Port ${PORT}...`);
});