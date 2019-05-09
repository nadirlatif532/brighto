'use strict';

module.exports = (sequelize, DataTypes) => {
    const Pallet = sequelize.define('Pallet', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }
    })
    Pallet.associate = function (models) {
        // associations can be defined here
        const {Color} = models;
        Pallet.belongsTo(Color,{as:'color_1'});
        Pallet.belongsTo(Color,{as:'color_2'});
        Pallet.belongsTo(Color,{as:'color_3'});
        Pallet.belongsTo(Color,{as:'color_4'});
        Pallet.belongsTo(Color,{as:'color_5'});
    };
    return Pallet;
};
