const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FaqSchema = new Schema({
    _id: {
        type: Number
    },
    title: {
        ka: {
            type: String,
            required: true
        },
        ru: {
            type: String,
            required: true
        },
        
    },
    description: {
        ka: {
            type: String,
            required: true
        },
        ru: {
            type: String,
            required: true
        },
    }
});

module.exports = mongoose.model('Faq', FaqSchema);