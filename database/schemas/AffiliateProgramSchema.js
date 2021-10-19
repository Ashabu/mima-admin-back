const mongoose = require('mongoose');
const Schema = mongoose.Schema


const AffiliateProgramSchema = new Schema({
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
    images: ['Picture']
});

module.exports = mongoose.model('AffiliateProgram', AffiliateProgramSchema);