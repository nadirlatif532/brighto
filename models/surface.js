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
    }
  });
  Surface.associate = function(models) {
    // associations can be defined here
  };
  return Surface;
};
