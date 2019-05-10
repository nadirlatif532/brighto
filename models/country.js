'use strict';

module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('Country', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Country Name is required'
                },
                len: {
                    args: [3, 40],
                    msg: 'Please provide a country name which must be 3-40 characters in length'
                }
            }
        }
    })
    Country.associate = function (models) {
        // associations can be defined here
        const { Product, Country_Product, Country_Shades, Shades } = models;
        Country.belongsToMany(Product, { through: Country_Product });
        Country.belongsToMany(Shades, { through: Country_Shades });
    };
    return Country;
};
