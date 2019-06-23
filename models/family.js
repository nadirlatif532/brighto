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
        r: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        g: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        b: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['updatedAt', 'createdAt'] }
        }
    })
    Family.associate = function (models) {
        // associations can be defined here
        const { ShadeFilter } = models;
        Family.belongsTo(ShadeFilter);
    };
    return Family;
};
