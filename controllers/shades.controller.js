const { Shades, Product, Family, Country, Color_Family, Country_Shades, Product_Shades } = require('../models');

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
        req.body['name'] = req.body.name.toLowerCase();
        const { name, r, g, b, description, itemCode, isAC, isRM, ProductId, countries, FamilyId } = req.body;
        const shade = await Shades.create({
            name, r, g, b, description, itemCode, isAC, isRM, FamilyId
        }, { raw: true });

        for (let country of countries) {
            await Country_Shades.create({
                ShadeId: shade.id,
                CountryId: country
            });
        }
        if (!ProductId || !exports.isValid(ProductId, true, shade.id)) {
            throw "Incorrect or no Product Id was provided.";
        }
        if (shade.isAC == 1) {
            exports.createProductShade(ProductId, shade.id);
        }
        else {
            if ((!(Product_Shades instanceof Array)) && (Product_Shades.length != 1)) {
                throw "Product Shades should be an array with a single value."
            }
            exports.createProductShade(Product_Shades, id);
        }
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
        if (!id) {
            throw "Id is missing or incorrect format";
        }
        await Shades.update(
            updateObject,
            { where: { id } },
        );
        let updatedShade = await Shades.findAll({ where: { id }, raw: true });

        if (updateObject['countries']) {
            for (let id of updateObject['countries']) {
                await Country_Shades.update(
                    { CountryId: id },
                    { where: { ShadeId: id } }
                );
            }
        }

        if (updateObject['ProductId']) {
            const { ProductId } = updateObject
            const { isAC, isRM, id } = updatedShade[0];
            if (!ProductId || !exports.isValid(ProductId, true, id)) {
                throw "Product Update Failed.Product Id should be an array";
            }
            if (isAC == 1) {
                await Product_Shades.destroy({ where: { ShadeId: id } });
                exports.createProductShade(ProductId, id);
            }
            else if (isRM == 1) {
                if ((!(Product_Shades instanceof Array)) && (Product_Shades.length != 1)) {
                    throw "Product Shades should be an array with a single value."
                }
                await Product_Shades.destroy({ where: { ShadeId: id } });
                exports.createProductShade(Product_Shades, id);
            }
        }
        return res.status(200).json({ success: true, message: "Shade Updated Successfully!" });
    }
    catch (err) {
        console.log(err);
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

exports.getShadeByCode = async (req, res) => {
    const { code } = req.body;
    try {
        if (!code) {
            throw "No item code was sent.";
        }
        const result = await Shades.findAll({ where: { itemCode: code } });
        return res.status(200).json({ success: true, result });
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
                    model: Country
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

        return res.status(200).json({ success: true, result });
    }
    catch (err) {
        console.log(err);
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
            include: [
                {
                    where: { id: product_id },
                    model: Product,
                    through: { attributes: [] }
                },
                {
                    model: Family
                },
                {
                    model: Country
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
        return res.status(200).json({ success: true, result });
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
            if (item['Family']) {
                item['Family']['color'] = { r: item['Family']['r'], g: item['Family']['g'], b: item['Family']['b'] };
                delete item['Family']['r'];
                delete item['Family']['g'];
                delete item['Family']['b'];
            }
        });
        return res.status(200).json({ success: true, result: result })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, errors: err });
    }
}