const { Pallet, Shades } = require("../models");


exports.computeDistance = (curr, original) => {
    curr = curr.map(Number);
    let finalDistance = { distance: 9999, id: 0 };
    for (let i of original) {
        let distance = Math.sqrt(Math.pow((i['r'] - curr[0]), 2) +
            Math.pow((i['g'] - curr[1]), 2) +
            Math.pow((i['b'] - curr[2]), 2));
        finalDistance = { ...finalDistance['distance'] < distance ? finalDistance : { distance, id: i['id'] } };
    }
    return finalDistance['id'];
};

exports.getAll = async (req, res) => {
    // try {
        console.log("*************");
        let result = await Pallet.findAll({
            include: [
                {
                    model: Shades,
                    as: 'color_1'
                },
                {
                    model: Shades,
                    as: 'color_2'
                },
                {
                    model: Shades,
                    as: 'color_3'
                },
                {
                    model: Shades,
                    as: 'color_4'
                }
            ]
        });
        result = JSON.parse(JSON.stringify(result));
        result.map(item => {
            item['color_1']['color'] = { r: item['color_1']['r'], g: item['color_1']['g'], b: item['color_1']['b']};
            delete item['color_1']['r'];
            delete item['color_1']['g'];
            delete item['color_1']['b'];

            item['color_2']['color'] = { r: item['color_2']['r'], g: item['color_2']['g'], b: item['color_2']['b']};
            delete item['color_2']['r'];
            delete item['color_2']['g'];
            delete item['color_2']['b'];

            item['color_3']['color'] = { r: item['color_3']['r'], g: item['color_3']['g'], b: item['color_3']['b']};
            delete item['color_3']['r'];
            delete item['color_3']['g'];
            delete item['color_3']['b'];

            item['color_4']['color'] = { r: item['color_4']['r'], g: item['color_4']['g'], b: item['color_4']['b']};
            delete item['color_4']['r'];
            delete item['color_4']['g'];
            delete item['color_4']['b'];
        });
        
        return res.status(200).json({ success: true, data: result });
    // } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    // }
};

exports.create = async (req, res) => {
    /*{
            "color1Id":"1",
            "color2Id":"2",
            "color3Id":"3",
            "color4Id":"4",
            "name":"newPalleta",
            "likes":10,
            "pallete_by":"Amjad"
    }*/
    try {
        const { rgb } = req.body;
        if (rgb) {
            const rgbValues = await Shades.findAll({ attributes: ['r', 'g', 'b', 'id'], raw: true });
            let shadeIds = [];
            rgb.forEach((item, index) => {
                shadeIds[index] = exports.computeDistance(item, rgbValues);
            })
            shadeIds.forEach((item, index) => {
                req.body[`color${index + 1}Id`] = item;
            });
        }
        await Pallet.create(req.body);
        return res
            .status(200)
            .json({ success: true, message: "Pallet created successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
};

exports.update = async (req, res) => {
    /*{
        "color1Id":"99",
        "color2Id":"2",
        "color3Id":"3",
        "color4Id":"4",
        "name":"newPalletsa",
        "likes":10,
        "pallete_by":"Farhan"
    }*/
    const updateFinishType = req.body;
    const { id } = req.params;
    if (!id) {
        throw "Id is missing or incorrect format";
    }
    try {
        await Pallet.update(updateFinishType, { where: { id } });
        return res
            .status(200)
            .json({ success: true, message: "Pallet updated successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw "Id is missing or incorrect format";
    }
    try {
        await Pallet.destroy({
            where: {
                id
            }
        });
        return res
            .status(200)
            .json({ success: true, message: "Pallet deleted successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
};
