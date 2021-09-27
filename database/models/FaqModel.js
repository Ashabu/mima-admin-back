'use strict';
module.exports = (sequelize, DataTypes) => {
    const faq = sequelize.define('Faq', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true
        }
    }, { schema: 'dbo' }
    );

    return faq;
};
