"use strict";

module.exports = (sequelize, DataTypes) => {
    const Surface = sequelize.define("Surface", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Surface Name is required"
                },
                len: {
                    args: [3, 40],
                    msg:
                        "Please provide a Surface name which must be 3-40 characters in length"
                }
            }
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
    }, {
        defaultScope: {
            attributes: { exclude: ['updatedAt', 'createdAt'] }
        }
    });
    Surface.associate = function (models) {
        // associations can be defined here
        const { Product, Category, Category_Surface, Surface_Finish_type, FinishType,Product_Surface } = models;
        Surface.belongsToMany(Category, { through: Category_Surface, onDelete: 'cascade' });
        Surface.belongsToMany(FinishType, { through: Surface_Finish_type, onDelete: 'cascade'});
        Surface.belongsToMany(Product, { through: Product_Surface, onDelete: 'cascade' ,hooks: true,});
    };
    return Surface;
};
