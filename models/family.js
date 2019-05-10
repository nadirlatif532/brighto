'use strict';

module.exports = (sequelize, DataTypes) => {
    const Family = sequelize.define('Family', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Shades Family Name is required'
                },
                len: {
                    args: [3, 40],
                    msg: 'Please provide a Shades Family name which must be 3-40 characters in length'
                }
            }
        },
        rgb: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    Family.associate = function (models) {
        // associations can be defined here
        const { Shades, Color_Family } = models;
        Family.belongsToMany(Shades, { through: Color_Family, onDelete: 'cascade' });

    };
    return Family;
};
