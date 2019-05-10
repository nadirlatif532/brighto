'use strict';

module.exports = (sequelize, DataTypes) => {
    const Related_Shades = sequelize.define('Related_Shades', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }
    })
    Related_Shades.associate = function (models) {
        // associations can be defined here
        const { Color } = models;
        Related_Shades.belongsTo(Color);
    };
    return Related_Shades;
};
