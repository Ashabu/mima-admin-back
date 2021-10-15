'use strict';
module.exports = (sequelize, DataTypes) => {
    const AffiliateProgram = sequelize.define('AffiliateProgram', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        }
    }, { schema: 'dbo' }
    );

    return AffiliateProgram;
};