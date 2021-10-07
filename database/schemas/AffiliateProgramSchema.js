const mongoose = require('mongoose');
const Schema = mongoose.Schema


const AffiliateProgramSchema = new Schema({
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
    subTitle: {
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

module.exports = mongoose.model('AffiliateProgram', AffiliateProgramSchema);