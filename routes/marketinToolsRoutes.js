const express = require('express');

const marketingToolController = require('../controllers/marketingToolController');

const authMidleware = require('../middleware/authMidleware');

const router = express.Router();

router.get('/getMarketingTools', marketingToolController.GetMarketingTools);

router.post('/addMarketingTool', authMidleware, marketingToolController.AddMarketingTool);

router.put('/editMarketingTool/:id', authMidleware, marketingToolController.UpdateMarketingTool);

router.delete('/deleteMarketingTool/:id', authMidleware, marketingToolController.DeleteMarketingTool);



module.exports = router;