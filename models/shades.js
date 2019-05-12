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
        const { Family, Color_Family, Product, Country, Country_Shades } = models;
        Shades.belongsToMany(Family, { through: Color_Family,onDelete: 'cascade' });
        Shades.belongsToMany(Country, { through: Country_Shades,onDelete: 'cascade' });
        Shades.belongsTo(Product, {onDelete: 'cascade'});
    };
    return Shades;
};
