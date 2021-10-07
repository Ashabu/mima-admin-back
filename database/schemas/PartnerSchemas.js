const mongoose = require('mongoose');
const Schema = mongoose.Schema


const PartnerSchema = new Schema({
        imgUrl: {
            type: String,
            required: true
        },
        linkUrl: {
            type: String,
            required: true
        }
});

module.exports = mongoose.model('Partner', PartnerSchema);