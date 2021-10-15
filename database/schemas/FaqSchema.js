const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FaqSchema = new Schema({
    
    title: {
        en: {
            type: String,
        },
        ru: {
            type: String,
        },
        
    },
    description: {
        en: {
            type: String,
        },
        ru: {
            type: String,
        },
    }
});

module.exports = mongoose.model('Faq', FaqSchema);