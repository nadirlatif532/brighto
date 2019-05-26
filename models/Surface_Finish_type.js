'use strict';

module.exports = (sequelize, DataTypes) => {
    const Surface_Finish_type = sequelize.define('Surface_Finish_type', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }
    })
    Surface_Finish_type.associate = function (models) {
        // associations can be defined here
    };
    return Surface_Finish_type;
};
