'use strict';

module.exports = (sequelize, DataTypes) => {
    const ColorTrends = sequelize.define('ColorTrends', {
        trendName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                isAlpha: {
                    msg: 'Last name should only contain alphabets',
                },
                len: {
                    args: [2, 254],
                    msg: 'Please provide an alphabetical last name which is 2-254 characters in length'
                }
            }
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: ""
        }
    })
    ColorTrends.associate = function (models) {
        // associations can be defined here
        const { Color } = models
        ColorTrends.belongsTo(Color);
    };
    return ColorTrends;
};
