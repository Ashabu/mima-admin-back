const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    title: {
        en: {
            type: String,
            required: true,
        },
        ru : {
            type: String,
            required: true,
        }
    },

    description: {
        en: {
            type: String,
            required: true,
        },
        ru : {
            type: String,
            required: true,
        }
    }
});


module.exports = mongoose.model('Testimonial', testimonialSchema);