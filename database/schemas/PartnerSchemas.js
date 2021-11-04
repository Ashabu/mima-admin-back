const mongoose = require('mongoose');
const Schema = mongoose.Schema


const PartnerSchema = new Schema({
        imgUrl: {
            type: String,
        },
        linkUrl: {
            type: String,
        }
});

module.exports = mongoose.model('Partner', PartnerSchema);