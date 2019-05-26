'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product_Shades = sequelize.define('Product_Shades', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }
    })
    Product_Shades.associate = function (models) {
        // associations can be defined here
    };
    return Product_Shades;
};
