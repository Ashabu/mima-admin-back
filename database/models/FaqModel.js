'use strict';
module.exports = (sequelize, DataTypes) => {
    const faq = sequelize.define('Faqs', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        langKey: DataTypes.STRING,
        itemKey: DataTypes.INTEGER,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, { schema: 'dbo' }
    );

    return faq;
};
