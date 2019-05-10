'use strict';

module.exports = (sequelize, DataTypes) => {
    const Country_Shades = sequelize.define('Country_Shades', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }
    })
    Country_Shades.associate = function (models) {
        // associations can be defined here
    };
    return Country_Shades;
};
