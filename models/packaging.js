"use strict";

module.exports = (sequelize, DataTypes) => {
    const Packaging = sequelize.define("Packaging", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "packaging type is required"
                },
                len: {
                    args: [3, 40],
                    msg:
                        "Please provide a packaging type which must be 3-40 characters in length"
                }
            }
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: '',
        }
    }, {
            defaultScope: {
                attributes: { exclude: ['updatedAt', 'createdAt'] }
            }
        });
    Packaging.associate = function (models) {
        // associations can be defined here
        const {Product} = models;
        Packaging.belongsToMany(Product, {through: Product_Packaging, onDelete: 'cascade'});
    };
    return Packaging;
};
