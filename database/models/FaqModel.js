'use strict';
module.exports = (sequelize, DataTypes) => {
    const faq = sequelize.define('Faq', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, { schema: 'dbo' }
    );

    return faq;
};
