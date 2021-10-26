const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Commission = require('./../../database/schemas/CommissionSchema');

const AmountRangeSchema = new Schema({
    percent :{
        type: String
    },
    range: {
        type : String
    },
   
});

module.exports = mongoose.model('AmountRange', AmountRangeSchema);