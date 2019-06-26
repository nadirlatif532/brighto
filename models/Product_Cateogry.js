'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product_Category = sequelize.define('Product_Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    })
    Product_Category.associate = function (models) {
        // associations can be defined here
    };
    return Product_Category;
};
