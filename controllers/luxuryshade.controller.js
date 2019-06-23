const { LuxuryShade } = require('../models');

exports.createLuxuryShade = async (req, res) => {
    const { name, itemCode, LuxuryFinishId } = req.body;
    try {
        await LuxuryShade.create({ name, image: req.files['image'][0].filename, itemCode, LuxuryFinishId });
        return res.status(200).json({ success: true, message: "Luxury Shade created successfully" });
    }
    catch (err) {
        console.log(err);
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
        else {
            delete updateLuxuryShade["image"];
        }
        await LuxuryShade.update(updateLuxuryShade, { where: { id } });
        return res.status(200).json({ success: true, message: 'Luxury Shade updated successfully' });
    }
    catch (err) {
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
        const result = await LuxuryShade.findAll({});
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getSpecificShade = async (req, res) => {
    try {
        const { shade_id } = req.body;
        const result = await LuxuryShade.findAll({ id: shade_id });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}