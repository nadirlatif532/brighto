"use strict";

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category Name is required"
        },
        len: {
          args: [3, 40],
          msg:
            "Please provide a Category name which must be 3-40 characters in length"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  });
  Category.associate = function (models) {
    // associations can be defined here
    const { ProjectType, ProjectType_Category, Surface, Category_Surface } = models;
    Category.belongsToMany(ProjectType, { through: ProjectType_Category, onDelete: 'cascade' });
    Category.belongsToMany(Surface, { through: Category_Surface, onDelete: 'cascade' });
  };
  return Category;
};
