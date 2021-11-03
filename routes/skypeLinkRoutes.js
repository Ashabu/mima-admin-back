const express = require('express');

const SkypeLinkController = require('../controllers/SkypeLinkController');

const authMidleware = require('../middleware/authMidleware');

const router = express.Router();

router.get('/getSkypeLinks', SkypeLinkController.GetSkypeLinks);

router.post('/addSkypeLink', authMidleware, SkypeLinkController.AddSkypeLink);

router.put('/editSkypeLink/:id', authMidleware, SkypeLinkController.UpdateSkypeLink);

router.delete('/deleteSkypeLink/:id', authMidleware, SkypeLinkController.DeleteSkypeLink);


module.exports = router;