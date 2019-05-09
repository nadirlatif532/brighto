'use strict';

module.exports = (sequelize, DataTypes) => {
    const Favorite_Pallet = sequelize.define('Favorite_Pallet', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }
    })
    Favorite_Pallet.associate = function (models) {
        // associations can be defined here
        const { Pallet } = models;
        Favorite_Pallet.belongsTo(Pallet);
    };
    return Favorite_Pallet;
};
