'use strict';

module.exports = (sequelize, DataTypes) => {
    const ColorTrends = sequelize.define('ColorTrends', {
        trendName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
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
    }, {
        defaultScope: {
            attributes: { exclude: ['updatedAt', 'createdAt'] }
        }
    })
    ColorTrends.associate = function (models) {
        // associations can be defined here
        const { Shades } = models
        ColorTrends.belongsTo(Shades, {as:'shade1'});
        ColorTrends.belongsTo(Shades, {as:'shade2'});
        ColorTrends.belongsTo(Shades, {as:'shade3'});
    };
    return ColorTrends;
};
