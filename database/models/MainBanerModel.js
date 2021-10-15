module.exports = (sequelize, DataTypes) => {
    const mainBanner = sequelize.define('MainBanner', {
        mainText: DataTypes.STRING,
        subText: DataTypes.STRING,
        mainImg: DataTypes.STRING,
        sideImgRight: DataTypes.STRING,
        sideImgLeft: DataTypes.STRING,
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        }
    }, { schema: 'dbo' }
    );

    return mainBanner;
};