const mongoose = require('mongoose');
const Schema = mongoose.Schema


const CommissionSchema = new Schema({
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
    },
    revenue: {
        type: String
    }
});

module.exports = mongoose.model('Commission', CommissionSchema);