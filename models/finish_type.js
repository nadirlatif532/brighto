"use strict";

module.exports = (sequelize, DataTypes) => {
  const FinishType = sequelize.define("FinishType", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "finish type is required"
        },
        len: {
          args: [3, 40],
          msg:
            "Please provide a finish type which must be 3-40 characters in length"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  });
  FinishType.associate = function (models) {
    // associations can be defined here
    
  };
  return FinishType;
};
