'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Username is required'
                },
                len: {
                    args: [3, 40],
                    msg: 'Please provide a product name which must be 3-40 characters in length'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },
        spreading: {
            type: DataTypes.INTEGER,
        }

    }, {
            indexes: [
                {
                    unique: true,
                    fields: ['name']
                }
            ]
        });

    Product.associate = function (models) {
        // associations can be defined here
        const { User, Favorite_Product, Country, Country_Product,Category } = models;
        Product.belongsToMany(User, { through: Favorite_Product });
        Product.belongsToMany(Country, { through: Country_Product });
        Product.belongsTo(Category);

    };
    return Product;
};
