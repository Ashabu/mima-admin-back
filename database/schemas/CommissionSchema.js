const mongoose = require('mongoose');
const Schema = mongoose.Schema


const CommissionSchema = new Schema({
    description: {
        type: Object,
        en: {
            type: String
        },
        ru: {
            type: String,
        },
    },
    imgUrl: {
        type: String,
    },
    revenue: {
        type: String
    }
});

module.exports = mongoose.model('Commission', CommissionSchema);