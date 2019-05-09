'use strict';

module.exports = (sequelize, DataTypes) => {
    const Family = sequelize.define('Family', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Color Family Name is required'
                },
                len: {
                    args: [3, 40],
                    msg: 'Please provide a Color Family name which must be 3-40 characters in length'
                }
            }
        },
        rbg: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    Family.associate = function (models) {
        // associations can be defined here
        const { Color, Color_Family } = models;
        Family.belongsToMany(Color, { through: Color_Family });

    };
    return Family;
};