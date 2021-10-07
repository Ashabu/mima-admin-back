const mongoose = require('mongoose');
const Schema = mongoose.Schema


const MarketingToolSchema = new Schema({
    title: {
        type: Object,
        ka: {
            type: String
        },
        ru: {
            type: String,
        },
        required: true
    },
    description: {
        type: Object,
        ka: {
            type: String
        },
        ru: {
            type: String,
        },
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('MarketingTool', MarketingToolSchema);