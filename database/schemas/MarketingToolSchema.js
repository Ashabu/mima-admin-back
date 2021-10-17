const mongoose = require('mongoose');
const Schema = mongoose.Schema


const MarketingToolSchema = new Schema({
    title: {
        type: Object,
        en: {
            type: String
        },
        ru: {
            type: String,
        },
        required: true
    },
    description: {
        type: Object,
        en: {
            type: String
        },
        ru: {
            type: String,
        },
        required: true
    },
    imgUrl: {
        type: String,
    }
});

module.exports = mongoose.model('MarketingTool', MarketingToolSchema);