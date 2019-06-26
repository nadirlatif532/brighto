const { ShadeFilter } = require("../models");

exports.ShadeFilter = async (req,res) => {
    try {
        const shades = await ShadeFilter.findAll({});
        return res.status(200).json({ success: true, data: shades });
    }
    catch(err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.createFilter = async (req,res) => {
    try {
        const {name} = req.body;
        const shades = await ShadeFilter.create({name});
        return res.status(200).json({ success: true, data: shades });
    }
    catch(err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.updateShadeFilter = async (req,res) => {
    const updateObject = req.body;
    const { id } = req.params;
    try {
        if(!id) {
            throw "Id is missing or incorrect format";
        }
        await ShadeFilter.update(
            updateObject,
            { where: { id } }
        );
        return res.status(200).json({ success: true, message: 'Shade Filter updated successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.deleteShadeFilter = async (req,res) => {
    const { id } = req.params;
    try {
        if(!id) {
            throw "Id is missing or incorrect format";
        }
        await ShadeFilter.destroy({
            where: {
                id
            }
        });
        return res.status(200).json({ success: true, message: 'Shade Filter deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}