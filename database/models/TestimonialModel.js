'use strict';
module.exports = (sequelize, DataTypes) => {
    const testimonial = sequelize.define('Testimonials', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        }
    }, { schema: 'dbo' }
    );

    return testimonial;
};