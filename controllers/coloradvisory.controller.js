const { ColorAdvisory } = require('../models');


exports.create = async (req, res) => {
    const { name, city, email, phone, projectDetail, message } = req.body;
    try {
        await ColorAdvisory.create({ name, city, email, phone, projectDetail, message });
        return res.status(200).json({ success: true, message: 'Color Advisory created successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.update = async (req, res) => {
    const updateObject = req.body;
    const { id } = req.params;
    try {
        if (!id) {
            throw "Id is missing or incorrect format";
        }
        await ColorAdvisory.update(
            updateObject,
            { where: { id } }
        );
        return res.status(200).json({ success: true, message: 'Color Advisory updated successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            throw "Id is missing or incorrect format";
        }
        await ColorAdvisory.destroy({
            where: {
                id
            }
        });
        return res.status(200).json({ success: true, message: 'Color Advisory deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getAll = async (req, res) => {
    try {
        const result = await ColorAdvisory.findAll({});
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getSpecificAdvisory = async (req, res) => {
    const { advisory_id } = req.body;
    try {
        const result = await ColorAdvisory.findAll({ id: advisory_id });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}