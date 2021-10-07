const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    title: {
        ka: {
            type: String,
            required: true,
        },
        ru : {
            type: String,
            required: true,
        }
    },

    description: {
        ka: {
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