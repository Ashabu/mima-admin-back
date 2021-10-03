'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('Users', {
        userName: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        createdAt: DataTypes.NOW,
        deletedAt: DataTypes.DATE,
        userId: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        }

    }, { schema: 'dbo', createdAt: true }
    );

    return user;
};