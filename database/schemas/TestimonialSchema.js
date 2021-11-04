const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    title: {
        en: {
            type: String,
        },
        ru : {
            type: String,
        }
    },
    linkUrl: {
        type: String
    },
    description: {
        en: {
            type: String,
        },
        ru : {
            type: String,
        }
    }
});


module.exports = mongoose.model('Testimonial', testimonialSchema);