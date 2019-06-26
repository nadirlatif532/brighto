'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product_ProjectType = sequelize.define('Product_ProjectType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    })
    Product_ProjectType.associate = function (models) {
        // associations can be defined here
    };
    return Product_ProjectType;
};
