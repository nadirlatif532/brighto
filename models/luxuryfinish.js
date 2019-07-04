'use strict';

module.exports = (sequelize, DataTypes) => {
    const LuxuryFinishes = sequelize.define('LuxuryFinishes', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Luxury Finish is required'
                },
                len: {
                    args: [3, 40],
                    msg: 'Please provide a Luxury Finish which must be 3-40 characters in length'
                }
            }
        },
        video: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },
        coverImage: {
            type: DataTypes.STRING
        },
        image1: {
            type: DataTypes.STRING
        },
        image2: {
            type: DataTypes.STRING
        },
        image3: {
            type: DataTypes.STRING
        },
        productImage: {
            type: DataTypes.STRING
        },
        sequence: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }, {
            defaultScope: {
                attributes: { exclude: ['updatedAt', 'createdAt'] }
            }
        })
    LuxuryFinishes.associate = function (models) {
        // associations can be defined here
        const { Country, LuxuryFinishes_Country, LuxuryShade, LuxuryFinishes_Shade } = models;
        LuxuryFinishes.belongsToMany(Country, { through: LuxuryFinishes_Country, onDelete: 'cascade' });
        LuxuryFinishes.belongsToMany(LuxuryShade, {through: LuxuryFinishes_Shade, onDelete: 'cascade'})
    };
    return LuxuryFinishes;
};
