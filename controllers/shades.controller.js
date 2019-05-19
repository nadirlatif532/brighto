const { Shades, Product, Family, Country } = require('../models');

exports.createShade = async (req, res) => {
    try {
        req.body['name'] = req.body.name.toLowerCase();
        const { name, r, g, b, description, itemCode, isAC, isRM, ProductId, countries, FamilyId } = req.body;
        const shade = await Shades.create({
            name, r, g, b, description, itemCode, isAC, isRM, ProductId
        }, { raw: true });
        for (let country of countries) {
            await Country_Shades.create({
                ShadeId: shade.id,
                CountryId: country["id"]
            });
        }
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
                include: [
                    {
                        where: { id: product_id },
                        model: Product
                    },
                    {
                        model: Color_Family
                    },
                    {
                        model: Country_Shades
                    }
                ]
            });
        }
        else if (shade_id) {
            result = await Shades.findAll({
                where: { id: shade_id },
                include: [
                    {
                        model: Product
                    },
                    {
                        model: Color_Family
                    },
                    {
                        model: Country_Shades
                    }
                ]
            });
        }
        else {
            result = await Shades.findAll({
                include: [
                    {
                        model: Product
                    },
                    {
                        model: Family,
                        through: {attributes: []}
                    },
                    {
                        model: Country,
                        through: {attributes: []}
                    }
                ]
            });
        }
        result = JSON.parse(JSON.stringify(result));
        result.map((item) => {
                item['color'] = { r: item['r'], g: item['g'], b: item['b'] };
                delete item['r'];
                delete item['g'];
                delete item['b'];
            item['Families'].map((family)=>{
                family['color'] = { r: family['r'], g: family['g'], b: family['b'] };
                delete family['r'];
                delete family['g'];
                delete family['b'];
            })
        });
        return res.status(200).json({ success: true, result: result })
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}