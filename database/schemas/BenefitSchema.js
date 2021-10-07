const mongoose = require('mongoose');
const Schema = mongoose.Schema


const BenefitSchema = new Schema({
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

module.exports = mongoose.model('Benefit', BenefitSchema);