const mongoose = require('mongoose');
const Schema = mongoose.Schema


const AffiliateSchema = new Schema({
    title: {
        
        en: {
            type: String
        },
        ru: {
            type: String,
        },
    },
    subTitle: {
        
        en: {
            type: String
        },
        ru: {
            type: String,
        },
    },
    images: []
});

module.exports = mongoose.model('Affiliate', AffiliateSchema);