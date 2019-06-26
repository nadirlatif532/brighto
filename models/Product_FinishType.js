'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product_FinishType = sequelize.define('Product_FinishType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    })
    Product_FinishType.associate = function (models) {
        // associations can be defined here
    };
    return Product_FinishType;
};
