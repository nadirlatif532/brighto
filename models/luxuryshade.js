'use strict';

module.exports = (sequelize, DataTypes) => {
    const LuxuryShade = sequelize.define('LuxuryShade', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Luxury Shade Name is required'
                },
                len: {
                    args: [3, 40],
                    msg: 'Please provide a Luxury Shade name which must be 3-40 characters in length'
                }
            }
        },
        image: {
            type: DataTypes.STRING,
        },
        itemCode: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
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
    LuxuryShade.associate = function (models) {
        // associations can be defined here 
        const {LuxuryFinishes, LuxuryFinishes_Shade} = models;
        LuxuryShade.belongsToMany(LuxuryFinishes, {through: LuxuryFinishes_Shade, onDelete: 'cascade'});
    };
    return LuxuryShade;
};
