'use strict';

module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('City', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'City Name is required'
                },
                len: {
                    args: [3, 40],
                    msg: 'Please provide a City name which must be 3-40 characters in length'
                }
            }
        },
        sequence: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['updatedAt', 'createdAt'] }
        }
    })
    City.associate = function (models) {
        // associations can be defined here
        const { Country } = models;
        City.belongsTo(Country);
    };
    return City;
};
