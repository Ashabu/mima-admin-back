module.exports = (sequelize, DataTypes) => {
    const benefit = sequelize.define('Benefits', {
        title: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        }
    }, { schema: 'dbo' }
    );

    return benefit;
};