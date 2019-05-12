const { Shades, Product } = require('../models');

exports.createShade = async (req, res) => {
    try {
        req.body['name'] = req.body.name.toLowerCase();
        const { name, r, g, b, description, itemCode, isAC, isRM, ProductId } = req.body;
        await Shades.create({
            name, r, g, b, description, itemCode, isAC, isRM, ProductId
        });
        return res.status(200).json({ success: true, message: 'Shade created successfully.' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.updateShade = async (req, res) => {
    try {
        const updateObject = req.body;
        const { id } = req.params;
        await Shades.update(
            updateObject,
            { where: { id } }
        );
        return res.status(200).json({ success: true, message: 'Shade updated successfully.' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}


exports.deleteShade = async (req, res) => {
    const { id } = req.params;
    try {
        await Shades.destroy({
            where: {
                id
            }
        });
        return res.status(200).json({ success: true, message: 'Shade deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getShades = async (req, res) => {
    try {
        const { product_id } = req.query;
        let result;
        if (product_id) {
            result = await Shades.findAll({
                include: {
                    where: { id: product_id },
                    model: Product,
                    attributes: []
                }
            })
        }
        else {
            result = await Shades.findAll({});
        }
        return res.status(200).json({ success: true, result: result })
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}