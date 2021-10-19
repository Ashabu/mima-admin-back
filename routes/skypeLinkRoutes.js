const express = require('express');

const SkypeLinkController = require('../controllers/SkypeLinkController');

const router = express.Router();

router.get('/getSkypeLinks', SkypeLinkController.GetSkypeLinks);

router.post('/addSkypeLink', SkypeLinkController.AddSkypeLink);

router.put('/editSkypeLink/:id', SkypeLinkController.UpdateSkypeLink);

router.delete('/deleteSkypeLink/:id', SkypeLinkController.DeleteSkypeLink);


module.exports = router;