const { Shades, Product, Family, Country, Color_Family, Country_Shades, Product_Shades, ShadeFilter } = require('../models');

/*helper methods */
exports.isValid = async (array, deleteValue = false, id) => {
    if (!(array instanceof Array)) {
        if (deleteValue) {
            await Shades.destroy({ where: { id } });
        }
        return true;
    }
    return false;
}

exports.createProductShade = async (ProductId, id) => {
    try {
        for (let pid of ProductId) {
            await Product_Shades.create({
                ProductId: pid,
                ShadeId: id
            })
        }
    }
    catch (err) {
        return err;
    }
}

/***************************** */

exports.createShade = async (req, res) => {
    try {
        const { name, description, itemCode, isAC, isRM, Products, Countries, sequence } = req.body;
        const { r, g, b } = req.body.color;
        const FamilyId = req.body.Family.id;
        const shade = await Shades.create({
            name, r, g, b, description, itemCode, isAC, isRM, FamilyId,sequence
        }, { raw: true });

        for (let country of Countries) {
            await Country_Shades.create({
                ShadeId: shade.id,
                CountryId: country.id
            });
        }
        for (let product of Products) {
            await Product_Shades.create({
                ProductId: product.id,
                ShadeId: shade.id
            })
        }
        return res.status(200).json({ success: true, message: 'Shade created successfully.' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.updateShade = async (req, res) => {
    try {
        let updateObject = req.body;
        const { r, g, b } = req.body.color;
        updateObject["r"] = r;
        updateObject["g"] = g;
        updateObject["b"] = b;
        const FamilyId = req.body.Family.id;
        delete updateObject["Family"];
        updateObject["FamilyId"] = FamilyId;
        const { id } = req.params;

        if (!id) {
            throw "Id is missing or incorrect format";
        }
        await Shades.update(
            updateObject,
            { where: { id } },
        );

        if (updateObject['Countries']) {
            await Country_Shades.destroy({ where: { ShadeId: id } });
            for (let country of updateObject['Countries']) {
                await Country_Shades.create({
                    ShadeId: id,
                    CountryId: country.id
                });
            }
        }
        if (updateObject['Products']) {
            await Product_Shades.destroy({ where: { ShadeId: id } });
            for (let product of updateObject['Products']) {
                await Product_Shades.create({
                    ShadeId: id,
                    ProductId: product.id
                });
            }
        }
        return res.status(200).json({ success: true, message: "Shade Updated Successfully!" });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}


exports.deleteShade = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw "Id is missing or incorrect format";
    }
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

exports.getColorDetails = async (req, res) => {
    const { family_id, country_id } = req.body;
    try {
        if (!family_id || !country_id) {
            throw "Family Id or Country Id is missing";
        }
        let result = await Shades.findAll({
            where: { FamilyId: family_id },
            include: [
                {
                    model: Country,
                    where: { id: country_id },
                    attributes: [],
                    through: { attributes: [] }
                },
                {
                    model: Product,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            ],
            order: ['sequence']
        });

        result = JSON.parse(JSON.stringify(result));
        result.map((item) => {
            item['color'] = { r: item['r'], g: item['g'], b: item['b'] };
            delete item['r'];
            delete item['g'];
            delete item['b'];
        });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getShadeByCode = async (req, res) => {
    const { code } = req.body;
    try {
        if (!code) {
            throw "No item code was sent.";
        }
        let result = await Shades.findAll({ where: { itemCode: code } });
        result = JSON.parse(JSON.stringify(result));
        result.map(item => {
            item['color'] = { r: item['r'], g: item['g'], b: item['b'] };
            delete item['r'];
            delete item['g'];
            delete item['b'];
        })
        return res.status(200).json({ success: true, data: result[0] });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getShadeById = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            throw "No Shade Id was sent.";
        }
        let result = await Shades.findAll({
            where: { id },
            include: [
                {
                    model: Product,
                    through: { attributes: [] }
                },
                {
                    model: Family
                },
                {
                    model: Country,
                    through: { attributes: [] }
                }
            ]
        });
        result = JSON.parse(JSON.stringify(result));

        result.map((item) => {
            item['color'] = { r: item['r'], g: item['g'], b: item['b'] };
            delete item['r'];
            delete item['g'];
            delete item['b'];
            item['Family']['color'] = { r: item['Family']['r'], g: item['Family']['g'], b: item['Family']['b'] };
            delete item['Family']['r'];
            delete item['Family']['g'];
            delete item['Family']['b'];
        });

        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}


exports.getShadeByProduct = async (req, res) => {
    const { product_id } = req.body;
    try {
        if (!product_id) {
            throw "No Product Id was sent.";
        }
        let result = await Shades.findAll({
            include: {
                model: Product,
                where: { id: product_id },
                through: { attributes: [] }
            },
            order: ['sequence']
        });
        result = JSON.parse(JSON.stringify(result));
        result.map((item) => {
            item['color'] = { r: item['r'], g: item['g'], b: item['b'] };
            delete item['r'];
            delete item['g'];
            delete item['b'];
        });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getShades = async (req, res) => {
    try {
        let result = await Shades.findAll({
            include: [
                {
                    model: Product,
                    through: { attributes: [] }
                },
                {
                    model: Family,
                    include: {
                        model: ShadeFilter
                    }
                },
                {
                    model: Country,
                    through: { attributes: [] }
                }
            ],
            order: ['sequence']
        });
        result = JSON.parse(JSON.stringify(result));
        result.map((item) => {
            item['color'] = { r: item['r'], g: item['g'], b: item['b'] };
            delete item['r'];
            delete item['g'];
            delete item['b'];
            if (item['Family']) {
                item['Family']['color'] = { r: item['Family']['r'], g: item['Family']['g'], b: item['Family']['b'] };
                delete item['Family']['r'];
                delete item['Family']['g'];
                delete item['Family']['b'];
            }
        });
        return res.status(200).json({ success: true, data: result })
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}