'use strict';

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        orderDetails: {
            type: DataTypes.TEXT
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM({
              values: ['PENDING', 'CONFIRMED', 'ACCEPTED','DELIVERED']
            }),
            allowNull:false
        },
        
    })
    Order.associate = function (models) {
        // associations can be defined here
        const {User,Dealer,Product,Shades} = models;
        Order.belongsTo(User);
        Order.belongsTo(Dealer);
        Order.belongsTo(Product);
        Order.belongsTo(Shades);
    };
    return Order;
};
