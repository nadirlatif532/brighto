'use strict';

module.exports = (sequelize, DataTypes) => {
    const Category_Surface = sequelize.define('Category_Surface', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }
    })
    Category_Surface.associate = function (models) {
        // associations can be defined here
    };
    return Category_Surface;
};
