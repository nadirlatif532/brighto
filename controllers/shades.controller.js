const { Shades, Product, Country_Shades, Color_Family } = require('../models');

exports.createShade = async (req, res) => {
    try {
        req.body['name'] = req.body.name.toLowerCase();
        const { name, r, g, b, description, itemCode, isAC, isRM, ProductId, CountryId,FamilyId } = req.body;
        const shade = await Shades.create({
            name, r, g, b, description, itemCode, isAC, isRM, ProductId
        }, { raw: true });
        await Country_Shades.create({
            CountryId,
            ShadeId: shade.id
        });
        await Color_Family.create({
            ShadeId: shade.id,
            FamilyId
        })
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
        const { product_id, shade_id } = req.body;
        let result;
        if (product_id) {
            result = await Shades.findAll({
                include: {
                    where: { id: product_id },
                    model: Product,
                    attributes: []
                },
                raw: true
            });
        }
        else if (shade_id) {
            result = await Shades.findAll({ where: { id: shade_id }, raw: true });
        }
        else {
            result = await Shades.findAll({ raw: true });
        }
        result.map((item) => {
            item['color'] = { r: item['r'], g: item['g'], b: item['b'] };
            delete item['r'];
            delete item['g'];
            delete item['b'];
        });
        return res.status(200).json({ success: true, result: result })
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}