'use strict';

module.exports = (sequelize, DataTypes) => {
    const Favorite_Product = sequelize.define('Favorite_Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }
    })
    Favorite_Product.associate = function (models) {
        // associations can be defined here
    };
    return Favorite_Product;
};
