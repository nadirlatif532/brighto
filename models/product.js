'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Product name is required'
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
            defaultValue: ''
        },
        coverImage: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
            indexes: [
                {
                   
                    fields: ['name']
                }
            ],
            defaultScope: {
                attributes: { exclude: ['updatedAt', 'createdAt'] }
            }
        });

    Product.associate = function (models) {
        // associations can be defined here
        const { Packaging,Product_Packaging, Product_Category, Product_Surface, Product_FinishType, Product_ProjectType, User, Order, Country, Country_Product, Category, Surface, ProjectType, FinishType, Shades, Product_Shades } = models;
        Product.belongsToMany(Country, { through: Country_Product, onDelete: 'cascade' });
        Product.belongsToMany(Shades, { through: Product_Shades, onDelete: 'cascade' });
       
        Product.belongsToMany(Category, { through: Product_Category, onDelete: 'cascade',hooks: true,  });
        Product.belongsToMany(Surface, { through: Product_Surface, onDelete: 'cascade',hooks: true,  });
        Product.belongsToMany(ProjectType, { through: Product_ProjectType, onDelete: 'cascade',hooks: true,  });
        Product.belongsToMany(FinishType, { through: Product_FinishType, onDelete: 'cascade',hooks: true,  });

        Product.belongsToMany(Packaging, {through: Product_Packaging, onDelete: 'cascade'});
    };
    return Product;
};
