const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkypeLinkSchema = new Schema({
    description: {
        type: String
    }
});

module.exports = mongoose.model('SkypeLink', SkypeLinkSchema);