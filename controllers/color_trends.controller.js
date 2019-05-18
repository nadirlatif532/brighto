const { ColorTrends, Shades } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const result = await ColorTrends.findAll({
            include: [{
                model: Shades,
            }]
        });
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
};

exports.create = async (req, res) => {
    try {
        await ColorTrends.create({ ...req.body, image: req.file.filename });
        return res
            .status(200)
            .json({ success: true, message: "Color Trends created successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
};

exports.update = async (req, res) => {
    const updateColorTrends = req.body;
    const { id } = req.params;
    if (req.file) {
        updateColorTrends['image'] = req.file.filename;
        const { image } = await ColorTrends.find({ where: { id: req.params.id }, raw: true });
        fs.unlinkSync(`${keys.storage}/${image}`);
    }
    try {
        await Pallet.update(updateColorTrends, { where: { id } });
        return res
            .status(200)
            .json({ success: true, message: "Color Trends updated successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await ColorTrends.destroy({
            where: {
                id
            }
        });
        return res
            .status(200)
            .json({ success: true, message: "Color Trends deleted successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
};
