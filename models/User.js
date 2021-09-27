const Sequelize = require('sequelize');
const db = require('../database');

const User  = db.define('user', {
    UserName: {
        type: Sequelize.STRING
    },
    Password: {
        type: Sequelize.STRING
    },
    Name: {
        type: Sequelize.STRING
    },
    Surname: {
        type: Sequelize.STRING
    },
    CreateDate: {
        type: Sequelize.STRING
    },
    DeleteDate: {
        type: Sequelize.STRING
    },

});

module.exports = User;