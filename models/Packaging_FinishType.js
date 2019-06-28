'use strict';

module.exports = (sequelize, DataTypes) => {
    const Packaging_FinishType = sequelize.define('Packaging_FinishType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    })
    Packaging_FinishType.associate = function (models) {
        // associations can be defined here
    };
    return Packaging_FinishType;
};
