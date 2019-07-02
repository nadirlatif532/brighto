'use strict';

module.exports = (sequelize, DataTypes) => {
    const LuxuryFinishes_Shade = sequelize.define('LuxuryFinishes_Shade', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    })
    LuxuryFinishes_Shade.associate = function (models) {
        // associations can be defined here
    };
    return LuxuryFinishes_Shade;
};
