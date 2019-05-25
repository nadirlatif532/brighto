'use strict';

module.exports = (sequelize, DataTypes) => {
    const Shades = sequelize.define('Shades', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Shades Name is required'
                },
                len: {
                    args: [3, 40],
                    msg: 'Please provide a Shades name which must be 3-40 characters in length'
                }
            }
        },
        itemCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: 'Item Code is required'
                }
            }
        },
        r: {
            type: DataTypes.INTEGER,
        },
        g: {
            type: DataTypes.INTEGER,
        },
        b: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT
        },
        isAC: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isRM: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
    Shades.associate = function (models) {
        // associations can be defined here 
        const { Family, Product, Country, Country_Shades,Product_Shades } = models;
        Shades.belongsTo(Family);
        Shades.belongsToMany(Country, { through: Country_Shades,onDelete: 'cascade' });
        Shades.belongsToMany(Product, {through: Product_Shades,onDelete: 'cascade'});
    };
    return Shades;
};
