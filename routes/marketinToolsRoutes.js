const express = require('express');

const marketingToolController = require('../controllers/marketingToolController');

const router = express.Router();

router.get('/getMarketingTools', marketingToolController.GetMarketingTools);

router.post('/addMarketingTool', marketingToolController.AddMarketingTool);

router.put('/editMarketingTool/:id', marketingToolController.UpdateMarketingTool);

router.delete('/deleteMarketingTool/:id', marketingToolController.DeleteMarketingTool);



module.exports = router;