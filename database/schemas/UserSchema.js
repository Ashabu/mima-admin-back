const mongoose = require('mongoose');
const Schema = mongoose.Schema


const userSchema = new Schema({
    
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    deleteDate: {
        type: Date
    },
});

module.exports = mongoose.model('User', userSchema);