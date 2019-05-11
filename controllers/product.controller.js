const { Product, Country } = require('../models');


exports.getAllProducts = async (req, res) => {
    let result;
    try {
        if (req.query.country) {
            result = await Product.findAll({
                include: {
                    model: Country,
                    where: { name: req.query.country },
                    required: true,
                    through: { attributes: [] }
                }
            });
        }
        else {
            result = await Product.findAll({});
        }
        return res.status(200).json({ success: true, message: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err });
    }
}


exports.getSpecificProduct = async (req, res) => {
    const id = req.params.product_id;
    try {
        const result = await Product.findAll({ where: { id } });
        return res.status(200).json({ success: true, message: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err });
    }
}


exports.createProduct = async (req, res) => {
    const { name, CategoryId, description, spreading, image } = req.body;
    console.log(req.body);
    try {
        await Product.create({
            name,
            CategoryId,
            description,
            spreading,
            image
        });
        return res.status(200).json({ success: true, message: 'Product created successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err });
    }
}


exports.updateProduct = async (req, res) => {
    /*Expects an object with the format: {name: 'Emulsion',description:'This is a good paint',is_active:1 ...}*/
    const updateObject = req.body;
    const { id } = req.params;
    try {
        await Product.update(
            updateObject,
            { where: { id } }
        );
        return res.status(200).json({ success: true, message: 'Product updated successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err });
    }
}


exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.destroy({
            where: {
                id
            }
        });
        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err });
    }
}