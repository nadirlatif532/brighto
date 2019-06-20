'use strict';

module.exports = (sequelize, DataTypes) => {
    const LuxuryFinishes = sequelize.define('LuxuryFinishes', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Luxury Finish is required'
                },
                len: {
                    args: [3, 40],
                    msg: 'Please provide a Luxury Finish which must be 3-40 characters in length'
                }
            }
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },
    }, {
        defaultScope: {
            attributes: { exclude: ['updatedAt', 'createdAt'] }
        }
    })
    return LuxuryFinishes;
};
