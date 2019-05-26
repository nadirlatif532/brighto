const { User, Product, Shades, Pallet } = require('../models');

exports.likePallete = async (req, res) => {
    const { id, pallete_id } = req.body;
    try {
        if (!id || !pallete_id) {
            throw "User id or Pallet id is missing.";
        }
        const user = await User.findAll({ where: { id }, raw: true });
        let liked_pallets = user[0].liked_pallets;
        liked_pallets.split(',').map((item) => {
            if (item == pallete_id) {
                throw "Pallete is already liked";
            }
        });
        liked_pallets = liked_pallets ? `${liked_pallets},${pallete_id}` : pallete_id;
        await User.update({ liked_pallets }, { where: { id } });
        return res.status(200).json({ success: true, message: 'Pallete updated successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getLikedProducts = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            throw "No user id is provided.";
        }
        const result = await User.findAll({ where: { id }, raw: true });
        let liked_products = result[0].liked_products;
        const details = await Product.findAll({
            where: { id: liked_products.split(',') }
        })
        return res.status(200).json({ success: true, result: details });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getLikedShades = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            throw "No user id is provided.";
        }
        const result = await User.findAll({ where: { id }, raw: true });
        let liked_shades = result[0].liked_shades;
        const details = await Shades.findAll({
            where: { id: liked_shades.split(',') }
        })
        return res.status(200).json({ success: true, result: details });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getLikedPallets = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            throw "No user id is provided.";
        }
        const result = await User.findAll({ where: { id }, raw: true });
        let liked_pallets = result[0].liked_pallets;
        const details = await Pallet.findAll({
            where: { id: liked_pallets.split(',') }
        })
        return res.status(200).json({ success: true, result: details });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.unlikePallete = async (req, res) => {
    const { id, pallete_id } = req.body;
    try {
        if (!id || !pallete_id) {
            throw "User id or Pallet id is missing.";
        }
        const user = await User.findAll({ where: { id }, raw: true });
        let liked_pallets = user[0].liked_pallets;
        if (!liked_pallets) {
            throw "This pallete has not been liked before";
        }
        liked_pallets = liked_pallets.split(',');
        liked_pallets.forEach((item, index) => {
            if (item == pallete_id) {
                liked_pallets.splice(index, 1);
            }
        })
        liked_pallets = liked_pallets.join(',');
        await User.update({ liked_pallets }, { where: { id } });
        return res.status(200).json({ success: true, message: 'Pallete updated successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.likeShade = async (req, res) => {
    const { id, shade_id } = req.body;
    try {
        if (!id || !shade_id) {
            throw "User id or Shade id is missing.";
        }
        const user = await User.findAll({ where: { id }, raw: true });
        let liked_shades = user[0].liked_shades;
        liked_shades.split(',').map((item) => {
            if (item == shade_id) {
                throw "Pallete is already liked";
            }
        });
        liked_shades = liked_shades ? `${liked_shades},${shade_id}` : shade_id;
        await User.update({ liked_shades }, { where: { id } });
        return res.status(200).json({ success: true, message: 'Shade updated successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.unlikeShade = async (req, res) => {
    const { id, shade_id } = req.body;
    try {
        if (!id || !shade_id) {
            throw "User id or Shade id is missing.";
        }
        const user = await User.findAll({ where: { id }, raw: true });
        let liked_shades = user[0].liked_shades;
        if (!liked_shades) {
            throw "This pallete has not been liked before";
        }
        liked_shades = liked_shades.split(',');
        liked_shades.forEach((item, index) => {
            if (item == shade_id) {
                liked_shades.splice(index, 1);
            }
        })
        liked_shades = liked_shades.join(',');
        await User.update({ liked_shades }, { where: { id } });
        return res.status(200).json({ success: true, message: 'Shade updated successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.likeProduct = async (req, res) => {
    const { id, product_id } = req.body;
    try {
        if (!id || !product_id) {
            throw "User id or Product id is missing.";
        }
        const user = await User.findAll({ where: { id }, raw: true });
        let liked_products = user[0].liked_products;
        liked_products.split(',').map((item) => {
            if (item == product_id) {
                throw "Product is already liked";
            }
        })
        liked_products = liked_products ? `${liked_products},${product_id}` : product_id;
        await User.update({ liked_products }, { where: { id } });
        return res.status(200).json({ success: true, message: 'Product updated successfully' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.unlikeProduct = async (req, res) => {
    const { id, product_id } = req.body;
    try {
        if (!id || !product_id) {
            throw "User id or Product id is missing.";
        }
        const user = await User.findAll({ where: { id }, raw: true });
        let liked_products = user[0].liked_products;
        if (!liked_products) {
            throw "This pallete has not been liked before";
        }
        liked_products = liked_products.split(',');
        liked_products.forEach((item, index) => {
            if (item == product_id) {
                liked_products.splice(index, 1);
            }
        })
        liked_products = liked_products.join(',');
        await User.update({ liked_products }, { where: { id } });
        return res.status(200).json({ success: true, message: 'Product updated successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}