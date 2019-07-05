const { LuxuryShade, LuxuryFinishes_Shade, LuxuryFinishes } = require('../models');
const fs = require('fs');
const keys = require('../config/keys');
exports.createLuxuryShade = async (req, res) => {
    const { name, itemCode, LuxuryFinishes, description, sequence } = req.body;
    try {
        let result = await LuxuryShade.create({ name, image: req.files['image'][0].filename, itemCode, description, sequence:1 });
        result = JSON.parse(JSON.stringify(result));
        for (let finish of JSON.parse(LuxuryFinishes)) {
            await LuxuryFinishes_Shade.create({
                LuxuryShadeId: result['id'],
                LuxuryFinishId: finish['id']
            })
        }
        return res.status(200).json({ success: true, message: "Luxury Shade created successfully" });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.updateLuxuryShade = async (req, res) => {
    const { id } = req.params;
    const updateLuxuryShade = req.body;
    try {
        if (!id) {
            throw "Id is missing or incorrect format";
        }
        if (req.files['image']) {
            updateLuxuryShade['image'] = req.files['image'][0].filename;
            const { image } = await LuxuryShade.find({ where: { id: req.params.id }, raw: true });
            fs.unlinkSync(`${keys.storage}/${image}`);
        }
        if (updateLuxuryShade['LuxuryFinishes']) {
            await LuxuryFinishes_Shade.destroy({ where: { LuxuryShadeId: id } });
            for (let finish of JSON.parse(updateLuxuryShade['LuxuryFinishes'])) {
                await LuxuryFinishes_Shade.create({
                    LuxuryShadeId: id,
                    LuxuryFinishId: finish['id']
                });
            }
        }
        else {
            delete updateLuxuryShade["image"];
        }
        await LuxuryShade.update(updateLuxuryShade, { where: { id } });
        return res.status(200).json({ success: true, message: 'Luxury Shade updated successfully' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.deleteLuxuryShade = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            throw "Id is missing or incorrect format";
        }
        await LuxuryShade.destroy({
            where: {
                id
            }
        });
        return res.status(200).json({ success: true, message: 'Luxury Shade deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getAllShades = async (req, res) => {
    try {
        const result = await LuxuryShade.findAll({
            order: ['sequence']
        });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getSpecificShade = async (req, res) => {
    try {
        const { shade_id } = req.body;
        const result = await LuxuryShade.findAll({
            where: { id: shade_id },
            include: [
                {
                    model: LuxuryFinishes,
                    through: { attributes: [] }
                }
            ]
        });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}