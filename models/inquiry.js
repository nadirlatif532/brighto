'use strict';
module.exports = (sequelize, DataTypes) => {
    const Inquiry = sequelize.define('Inquiry', {
        inquiry: {
            type: DataTypes.TEXT
        }
    });


    Inquiry.associate = function (models) {
        const { User } = models;
        Inquiry.belongsTo(User);
        // associations can be defined here
    };
    return Inquiry;
}

