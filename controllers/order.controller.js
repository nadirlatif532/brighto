const { Order, Dealer, User, Product, Shades } = require('../models');

exports.createOrder = async (req, res) => {
    try {
        const { orderDetails, quantity, status, UserId, DealerId, ProductId, ShadeId } = req.body;
        await Order.create({ orderDetails, quantity, status, UserId, DealerId, ProductId, ShadeId });
        return res.status(200).json({ success: true, message: 'Order created successfully' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.updateOrder = async (req, res) => {
    const updateObject = req.body;
    console.log(updateObject)
    const { id } = req.params;
    try {
        if (!id) {
            throw "Id is missing or incorrect format";
        }
        await Order.update(
            updateObject,
            { where: { id } }
        );
        return res.status(200).json({ success: true, message: 'Order updated successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            throw "Id is missing or incorrect format";
        }
        await Order.destroy({
            where: {
                id
            }
        });
        return res.status(200).json({ success: true, message: 'Order deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const result = await Order.findAll({
            attributes:["id","orderDetails","status","quantity","createdAt","updatedAt"],
            include: [
                {
                    model: User
                },
                {
                    model: Dealer
                },
                {
                    model: Product
                },
                {
                    model: Shades
                }
            ]
        });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getOrderByDealer = async (req, res) => {
    try {
        const { dealer_id } = req.body;
        if (!dealer_id) {
            throw "Dealer Id was missing";
        }
        const result = await Order.findAll({
            attributes:["id","orderDetails","status","quantity","createdAt","updatedAt"],
            include: [
                {
                    model: User
                },
                {
                    model: Dealer,
                    where: { id: dealer_id }
                },
                {
                    model: Product
                },
                {
                    model: Shades
                }
            ]
        });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getOrderByUser = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            throw "User Id was missing";
        }
        const result = await Order.findAll({
            attributes:["id","orderDetails","status","quantity","createdAt","updatedAt"],
            include: [
                {
                    model: User,
                    where: { id: user_id }
                },
                {
                    model: Dealer,
                },
                {
                    model: Product
                },
                {
                    model: Shades
                }
            ]
        });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getSpecificOrder = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            throw "Order Id was missing";
        }
        const result = await Orders.findAll({
            where: { id },
            include: [
                {
                    model: User
                },
                {
                    model: Dealers
                },
                {
                    model: Product
                },
                {
                    model: Shades
                }
            ]
        });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}