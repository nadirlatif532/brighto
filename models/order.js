'use strict';

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        orderDetails: {
            type: DataTypes.TEXT
        },
        orderNumber: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM({
                values: ['PENDING', 'CONFIRMED','CANCELLED']
            }),
            allowNull: false
        },

    }, {
        defaultScope: {
            attributes: { exclude: ['updatedAt', 'createdAt'] }
    }
    })
    Order.associate = function (models) {
        // associations can be defined here
        const { User, Dealer, Product, Shades } = models;
        Order.belongsTo(User);
        Order.belongsTo(Dealer);
        Order.belongsTo(Product);
        Order.belongsTo(Shades);
    };
    return Order;
};
