const { Order, Dealer, User, Product, Shades, Country, City,Family } = require('../models');

exports.createOrder = async (req, res) => {
    try {
        const { orderDetails, quantity, status, UserId, DealerId, ProductId, ShadeId } = req.body;
        await Order.create({ orderDetails, quantity, status, UserId, DealerId, ProductId, ShadeId });
        return res.status(200).json({ success: true, message: 'Order created successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.updateOrder = async (req, res) => {
    const updateObject = req.body;
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
        let result = await Order.findAll({
            include: [
                {
                    model: User
                },
                {
                    model: Dealer,
                    attributes:["id","name","address","longitude","latitude","isAC","isRM"],
                    include: [
                        {
                            model: Country
                        },
                        {
                            model: City,
                            include: {
                                model: Country
                            }
                        }
                    ]
                },
                {
                    model: Product
                },
                {
                    model: Shades,
                    attributes:['id','r','g','b','isAC','isRM','itemCode','name','description'],
                    include: [
                        {
                            model: Country,
                            through: { attributes: [] }
                        },
                        {
                            model: Family
                        },
                        {
                            model: Product
                        }
                    ]
                }
            ]
        });
        result = JSON.parse(JSON.stringify(result));
        result = result.map((result)=>{
            result['Shade']['color'] = {r:result['Shade']['r'],g:result['Shade']['g'],b:result['Shade']['b']}
            delete result['Shade']['r'];
            delete result['Shade']['g'];
            delete result['Shade']['b'];
            if(result['Shade']['Family']){
                result['Shade']['Family']['color'] = {r:result['Shade']['Family']['r'],g:result['Shade']['Family']['g'],b:result['Shade']['Family']['b']}
                delete result['Shade']['Family']['r'];
                delete result['Shade']['Family']['g'];
                delete result['Shade']['Family']['b'];
            }
            return result;
        })
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
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
            attributes:["id","orderDetails","status","quantity"],
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
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getOrderByUser = async (req, res) => {
    try {

        const { id } = req.user;
        if (!id) {
            throw "User Id was missing";
        }
        const result = await Order.findAll({
            attributes:["id","orderDetails","status","quantity"],
            include: [
                {
                    model: User,
                    where: { id }
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