'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product_Surface = sequelize.define('Product_Surface', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    })
    Product_Surface.associate = function (models) {
        // associations can be defined here
    };
    return Product_Surface;
};
