'use strict';

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Category Name is required'
                },
                len: {
                    args: [3, 40],
                    msg: 'Please provide a Category name which must be 3-40 characters in length'
                }
            }
        }
    })
    Category.associate = function (models) {
        // associations can be defined here
    };
    return Category;
};
