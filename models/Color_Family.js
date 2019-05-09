'use strict';

module.exports = (sequelize, DataTypes) => {
    const Color_Family = sequelize.define('Color_Family', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }
    })
    Color_Family.associate = function (models) {
        // associations can be defined here
    };
    return Color_Family;
};
