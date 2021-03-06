const { User, Product, Shades, Pallet } = require('../models');
const db = require('../models/index');

exports.likePallete = async (req, res) => {
    const { pallete_id } = req.body;
    try {
        if (!pallete_id) {
            throw "Pallet id is missing.";
        }
        let liked_pallets = req.user.liked_pallets;
        if (liked_pallets) {
            liked_pallets.split(',').map((item) => {
                if (item == pallete_id) {
                    throw "Pallete is already liked";
                }
            });
        }
        await Pallet.update({ likes: db.sequelize.literal('likes + 1') }, { where: { id: pallete_id } });
    
        liked_pallets = liked_pallets ? `${liked_pallets},${pallete_id}` : pallete_id;
        await User.update({ liked_pallets }, { where: { id: req.user.id } });
        return res.status(200).json({ success: true, message: 'Pallete liked' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getLikedProducts = async (req, res) => {
    try {
        const result = await User.findOne({ where: { id: req.user.id }, raw: true });
        let liked_products = result.liked_products;
        if (!liked_products) {
            return res.status(200).json({ success: true, data: [] });
        }
        const details = await Product.findAll({
            where: { id: liked_products.split(',') }
        })
        return res.status(200).json({ success: true, data: details });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getLikedShades = async (req, res) => {
    try {
        const result = await User.findOne({ where: { id: req.user.id }, raw: true });
        let liked_shades = result.liked_shades;
        if (!liked_shades) {
            return res.status(200).json({ success: true, data: [] });
        }
        let details = await Shades.findAll({
            where: { id: liked_shades.split(',') }
        })
        details = JSON.parse(JSON.stringify(details));
        details.map(item => {
            item['color'] = { r: item['r'], g: item['g'], b: item['b'] };
            delete item['r'];
            delete item['g'];
            delete item['b'];
        })
        return res.status(200).json({ success: true, data: details });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getLikedPallets = async (req, res) => {
    try {
        let liked_pallets = req.user.liked_pallets;
        if (!liked_pallets) {
            return res.status(200).json({ success: true, data: [] });
        }
        let details = await Pallet.findAll({
            where: { id: liked_pallets.split(',') }
        });
        details = JSON.parse(JSON.stringify(details));
        details.map((item) => {
            item['color'] = { color1: item['color1Id'], color2: item['color2Id'], color3: item['color3Id'], color4: item['color4Id'] }
            delete item['color1Id'];
            delete item['color2Id'];
            delete item['color3Id'];
            delete item['color4Id'];
        })
        return res.status(200).json({ success: true, data: details });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.unlikePallete = async (req, res) => {
    const { pallete_id } = req.body;
    try {
        if (!pallete_id) {
            throw "Pallet id is missing.";
        }
        let liked_pallets = req.user.liked_pallets;
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
        await Pallet.update({ likes: db.sequelize.literal('likes - 1') }, { where: { id: pallete_id } });
        await User.update({ liked_pallets }, { where: { id: req.user.id } });
        return res.status(200).json({ success: true, message: 'Pallete unliked' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.likeShade = async (req, res) => {
    const { shade_id } = req.body;
    try {
        if (!shade_id) {
            throw "Shade id is missing.";
        }
        const user = await User.findOne({ where: { id: req.user.id }, raw: true });
        let liked_shades = user.liked_shades;
        if (liked_shades) {
            liked_shades.split(',').map((item) => {
                if (item == shade_id) {
                    throw "Shade is already liked";
                }
            });
        }

        const shade = await Shades.findOne({ where: { id: shade_id }, raw: true });

        if (shade) {
            liked_shades = liked_shades ? `${liked_shades},${shade.id}` : shade.id;
            await User.update({ liked_shades }, { where: { id: req.user.id } });
        } else {
            throw "Invalid Shade Id";
        }

        return res.status(200).json({ success: true, message: 'Shade liked' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.unlikeShade = async (req, res) => {
    const { shade_id } = req.body;
    try {
        if (!shade_id) {
            throw "Shade id is missing.";
        }
        const shade = await Shades.findOne({ where: { id: shade_id }, raw: true });
        if (!shade) {
            throw "Invalid Shade Id";
        }
        const user = await User.findOne({ where: { id: req.user.id }, raw: true });
        let liked_shades = user.liked_shades;
        if (!liked_shades) {
            throw "This shade has not been liked before";
        }
        if (liked_shades) {
            liked_shades = liked_shades.split(',');
            liked_shades.forEach((item, index) => {
                if (item == shade_id) {
                    liked_shades.splice(index, 1);
                }
            })
        }

        liked_shades = liked_shades.join(',');
        await User.update({ liked_shades }, { where: { id: req.user.id } });
        return res.status(200).json({ success: true, message: 'Shade unliked' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.likeProduct = async (req, res) => {
    const { product_id } = req.body;
    try {
        if (!product_id) {
            throw "Product id is missing.";
        }
        const user = await User.findOne({ where: { id: req.user.id }, raw: true });
        let liked_products = user.liked_products;
        if (liked_products) {
            liked_products.split(',').map((item) => {
                if (item == product_id) {
                    throw "Product is already liked";
                }
            })
        }
        const product = await Product.findOne({ where: { id: product_id }, raw: true });
        if (product) {
            liked_products = liked_products ? `${liked_products},${product.id}` : product.id;
            await User.update({ liked_products }, { where: { id: req.user.id } });
        } else {
            throw "Invalid Product Id";
        }

        return res.status(200).json({ success: true, message: 'Product liked' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.unlikeProduct = async (req, res) => {
    const { product_id } = req.body;
    try {
        if (!product_id) {
            throw "Product id is missing.";
        }
        const product = await Product.findOne({ where: { id: product_id }, raw: true });
        if (!product) {
            throw "Invalid Product Id";
        }
        const user = await User.findOne({ where: { id: req.user.id }, raw: true });
        let liked_products = user.liked_products;
        if (!liked_products) {
            throw "This product has not been liked before";
        }
        if (liked_products) {
            let flag = false;
            liked_products = liked_products.split(',');
            liked_products.forEach((item, index) => {
                if (item == product_id) {
                    flag = true;
                    liked_products.splice(index, 1);
                }
            })
            if (!flag) {
                throw "Shade already unliked"
            }
        }
        liked_products = liked_products.join(',');
        await User.update({ liked_products }, { where: { id: req.user.id } });
        return res.status(200).json({ success: true, message: 'Product unliked' });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}
exports.getUserPalletes = async (req, res) => {
    try {
        let palletes = await Pallet.findAll({});
        palletes = JSON.parse(JSON.stringify(palletes));
        let userLikedPalletes = await User.findOne({ where: { id: req.user.id }, attributes: ['liked_pallets'] });
        userLikedPalletes = JSON.parse(JSON.stringify(userLikedPalletes));
        userLikedPalletes = userLikedPalletes['liked_pallets'].toString().split(',');

        if (!userLikedProducts['liked_pallets']) {
            userLikedProducts['liked_pallets'] = [];
        }

        palletes = palletes.map((item) => {
            let isLiked = false;
            userLikedPalletes.map((liked) => {
                if (liked == item['id']) {
                    item['isLiked'] = true
                    isLiked = true;
                }
            })
            if (!isLiked) {
                item['isLiked'] = false
            }
            return item;
        });
        palletes.map((item) => {
            item['color'] = { color1: item['color1Id'], color2: item['color2Id'], color3: item['color3Id'], color4: item['color4Id'] }
            delete item['color1Id'];
            delete item['color2Id'];
            delete item['color3Id'];
            delete item['color4Id'];
        })
        return res.status(200).json({ success: true, data: palletes });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getUserProducts = async (req, res) => {
    try {
        let products = await Product.findAll({});
        products = JSON.parse(JSON.stringify(products));
        let userLikedProducts = await User.findOne({ where: { id: req.user.id }, attributes: ['liked_products'] });
        userLikedProducts = JSON.parse(JSON.stringify(userLikedProducts));
        if (!userLikedProducts['liked_products']) {
            userLikedProducts['liked_products'] = [];
        }
        userLikedProducts = userLikedProducts['liked_products'].toString().split(',');

        products = products.map((item) => {
            let isLiked = false;
            userLikedProducts.map((liked) => {
                if (liked == item['id']) {
                    item['isLiked'] = true
                    isLiked = true;
                }
            })
            if (!isLiked) {
                item['isLiked'] = false
            }
            return item;
        });
        return res.status(200).json({ success: true, data: products });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getUserShades = async (req, res) => {
    try {
        let shades = await Shades.findAll({});
        shades = JSON.parse(JSON.stringify(shades));
        let userLikedShades = await User.findOne({ where: { id: req.user.id }, attributes: ['liked_shades'] });
        userLikedShades = JSON.parse(JSON.stringify(userLikedShades));
        if (!userLikedShades['liked_shades']) {
            userLikedShades['liked_shades'] = [];
        }
        userLikedShades = userLikedShades['liked_shades'].toString().split(',');

        shades = shades.map((item) => {
            let isLiked = false;
            userLikedShades.map((liked) => {
                if (liked == item['id']) {
                    item['isLiked'] = true
                    isLiked = true;
                }
            })
            if (!isLiked) {
                item['isLiked'] = false
            }
            return item;
        });
        shades.map(item => {
            item['color'] = { r: item['r'], g: item['g'], b: item['b'] };
            delete item['r'];
            delete item['g'];
            delete item['b'];
        })
        return res.status(200).json({ success: true, data: shades });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, errors: err });
    }
}