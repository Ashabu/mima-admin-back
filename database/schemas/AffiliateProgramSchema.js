const mongoose = require('mongoose');
const Schema = mongoose.Schema


const AffiliateProgramSchema = new Schema({
    title: {
        type: Object,
        en: {
            type: String
        },
        ru: {
            type: String,
        },
    },
    subTitle: {
        type: Object,
        en: {
            type: String
        },
        ru: {
            type: String,
        },
    },
    imgUrl: {
        type: String,
    }
});

module.exports = mongoose.model('AffiliateProgram', AffiliateProgramSchema);