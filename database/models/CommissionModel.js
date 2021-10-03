module.exports = (sequelize, DataTypes) => {
    const commission = sequelize.define('Commissions', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        revenue: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        }
    }, { schema: 'dbo' }
    );

    return commission;
};