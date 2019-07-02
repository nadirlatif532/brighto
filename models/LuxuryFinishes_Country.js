'use strict';

module.exports = (sequelize, DataTypes) => {
    const LuxuryFinishes_Country = sequelize.define('LuxuryFinishes_Country', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    })
    LuxuryFinishes_Country.associate = function (models) {
        // associations can be defined here
    };
    return LuxuryFinishes_Country;
};
