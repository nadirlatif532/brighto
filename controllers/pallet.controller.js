const { Pallet, Shades } = require("../models");
exports.getAll = async (req, res) => {
    try {
        const result = await Pallet.findAll({
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
                },
                {
                    model: Shades,
                    as: 'color_5'
                },
                {
                    model: Shades,
                    as: 'color_6'
                },
                {
                    model: Shades,
                    as: 'color_7'
                }
            ]
        });
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
};

exports.create = async (req, res) => {
    /*
        {
            "color1Id":"1",
            "color2Id":"2",
            "color3Id":"3",
            "color4Id":"4",
            "name":"newPalleta",
            "likes":10,
            "pallete_by":"Amjad"
        }
    */

    try {
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
