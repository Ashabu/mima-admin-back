'use strict';
module.exports = (sequelize, DataTypes) => {
    const partner = sequelize.define('Partners', {
        title: DataTypes.STRING,
        linkUrl: DataTypes.STRING,
        iamgeUrl: DataTypes.STRING,
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        }
    }, { schema: 'dbo' }
    );

    return partner;
};