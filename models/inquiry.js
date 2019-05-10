'use strict';
module.exports = (sequelize, DataTypes) => {
    const Inquiry = sequelize.define('Inquiry', {
        message: {
            type: DataTypes.TEXT
        },
        projectDetails: {
            type: DataTypes.TEXT
        },
        phone: {
            type: DataTypes.STRING
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
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        userId: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Oops. Looks like you already have an account with this email address. Please try logging in'
            },
            allowNull: false,
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                isAlpha: {
                    msg: 'First name should only contain alphabets'
                },
                len: {
                    args: [2, 254],
                    msg: 'Please provide an alphabetical first name which is 2-254 characters in length'
                }
            }
        },
    });


    Inquiry.associate = function (models) {
        // associations can be defined here
    };
    return Inquiry;
}

