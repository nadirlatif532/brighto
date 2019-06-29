'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product_Packaging = sequelize.define('Product_Packaging', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    })
    Product_Packaging.associate = function (models) {
        // associations can be defined here
    };
    return Product_Packaging;
};
