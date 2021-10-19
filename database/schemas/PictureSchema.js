const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    imgUrl : {
        type: String
    },
    relatesTo: {
        type: Schema.Types.ObjectId,
        
    }
});

module.exports = mongoose.model('Picture', PictureSchema);