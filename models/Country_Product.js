'use strict';

module.exports = (sequelize, DataTypes) => {
    const Country_Product = sequelize.define('Country_Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }
    })
    Country_Product.associate = function (models) {
        // associations can be defined here
    };
    return Country_Product;
};
