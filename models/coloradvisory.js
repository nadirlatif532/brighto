'use strict';

module.exports = (sequelize, DataTypes) => {
    const ColorAdvisory = sequelize.define('ColorAdvisory', {
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
        city: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Oops. Looks like you already have an account with this email address. Please try logging in'
            },
            allowNull: false,
            defaultValue: '',
            validate: {
                isEmail: {
                    msg: 'Please provide a valid email address'
                }
            }
        },
        phone: {
            type: DataTypes.STRING
        },
        projectDetail: {
            type: DataTypes.TEXT
        },
        message: {
            type: DataTypes.TEXT
        },

    }, {
            defaultScope: {
                attributes: { exclude: ['updatedAt', 'createdAt'] }
            }
        })
    return ColorAdvisory;
};
