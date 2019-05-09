'use strict';

module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define('Color', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Color Name is required'
                },
                len: {
                    args: [3, 40],
                    msg: 'Please provide a Color name which must be 3-40 characters in length'
                }
            }
        },
        rbg: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT
        }
    })
    Color.associate = function (models) {
        // associations can be defined here
        const { User, Favorite_Shades } = models;
        Color.belongsToMany(User, { through: Favorite_Shades });
        const { Family, Color_Family } = models;
        Color.belongsToMany(Family, { through: Color_Family });

    };
    return Color;
};
