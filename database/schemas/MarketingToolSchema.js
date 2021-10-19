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
    },
    description: {
        type: Object,
        en: {
            type: String
        },
        ru: {
            type: String,
        },
    },
    images: ['Picture'],
});

module.exports = mongoose.model('MarketingTool', MarketingToolSchema);