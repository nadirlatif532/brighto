'use strict';

module.exports = (sequelize, DataTypes) => {
    const Favorite_Shades = sequelize.define('Favorite_Shades', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }
    })
    Favorite_Shades.associate = function (models) {
        // associations can be defined here
    };
    return Favorite_Shades;
};
