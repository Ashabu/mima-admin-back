const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imgUrl : {
        type: String
    },
    relatesTo: {
        type: String
    }
});

module.exports = mongoose.model('Image', ImageSchema);