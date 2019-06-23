'use strict';

module.exports = (sequelize, DataTypes) => {
    const ShadeFilter = sequelize.define('ShadeFilter', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Shade Filter Name is required'
                },
                len: {
                    args: [3, 40],
                    msg: 'Please provide a Shade Filter name which must be 3-40 characters in length'
                }
            }
        }
    }, {
            defaultScope: {
                attributes: { exclude: ['updatedAt', 'createdAt'] }
            }
        })
    ShadeFilter.associate = function (models) {
        // associations can be defined here
    };
    return ShadeFilter;
};
