'use strict';

module.exports = (sequelize, DataTypes) => {
    const Pallet = sequelize.define('Pallet', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                len: {
                    args: [2, 254],
                    msg: 'Please provide an alphabetical name which is 2-254 characters in length'
                }
            }
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        pallete_by: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                len: {
                    args: [2, 254],
                    msg: 'Please provide an alphabetical name which is 2-254 characters in length'
                }
            }
        },
    }, {
        // defaultScope: {
        //     attributes: { exclude: ['updatedAt', 'createdAt'] }
        // }
    })
    Pallet.associate = function (models) {
        // associations can be defined here
        const {Shades } = models;
        Pallet.belongsTo(Shades, { as: 'color_1' });
        Pallet.belongsTo(Shades, { as: 'color_2' });
        Pallet.belongsTo(Shades, { as: 'color_3' });
        Pallet.belongsTo(Shades, { as: 'color_4' });
    };
    return Pallet;
};
