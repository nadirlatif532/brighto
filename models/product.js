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
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: '',
            validate: {
                isUrl: {
                    msg: "Invalid format. Please provide a URL"
                }
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
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
        const { User, Order, Country, Country_Product, Category } = models;
        Product.belongsToMany(Country, { through: Country_Product, onDelete: 'cascade' });
        Product.belongsTo(Category, { onDelete: 'cascade' });

    };
    return Product;
};
