const { ColorTrends, Shades } = require('../models');
const fs = require('fs');
const keys = require('../config/keys')

exports.getById = async (req,res) => {
    try {
    if(!req.body.id) {
        throw "No id was provided.";
    }
    let result = await ColorTrends.findAll({
        where: {id: req.body.id},
        include: [
            {
                model: Shades,
                as: 'shade1'
            },
            {
                model: Shades,
                as: 'shade2'
            },
            {
                model: Shades,
                as: 'shade3'
            },
        ]
    });
    result = JSON.parse(JSON.stringify(result));
    result.map((item) => {
        item['shade1']['color'] = {r:item['shade1']['r'],g:item['shade1']['g'],b:item['shade1']['b']};
        delete item['shade1']['r'];
        delete item['shade1']['g'];
        delete item['shade1']['b'];

        item['shade2']['color'] = {r:item['shade2']['r'],g:item['shade2']['g'],b:item['shade2']['b']};
        delete item['shade2']['r'];
        delete item['shade2']['g'];
        delete item['shade2']['b'];

        item['shade3']['color'] = {r:item['shade3']['r'],g:item['shade3']['g'],b:item['shade3']['b']};
        delete item['shade3']['r'];
        delete item['shade3']['g'];
        delete item['shade3']['b'];
    });
    return res.status(200).json({ success: true, data: result });   
    }
    catch(err) {
        return res.status(500).json({ success: false, errors: err });
    }
}
exports.getAll = async (req, res) => {
    try {
        let result = await ColorTrends.findAll({
            include: [
                {
                    model: Shades,
                    as: 'shade1'
                },
                {
                    model: Shades,
                    as: 'shade2'
                },
                {
                    model: Shades,
                    as: 'shade3'
                },
            ]
        });
        result = JSON.parse(JSON.stringify(result));
        result.map((item) => {
            item['shade1']['color'] = {r:item['shade1']['r'],g:item['shade1']['g'],b:item['shade1']['b']};
            delete item['shade1']['r'];
            delete item['shade1']['g'];
            delete item['shade1']['b'];

            item['shade2']['color'] = {r:item['shade2']['r'],g:item['shade2']['g'],b:item['shade2']['b']};
            delete item['shade2']['r'];
            delete item['shade2']['g'];
            delete item['shade2']['b'];

            item['shade3']['color'] = {r:item['shade3']['r'],g:item['shade3']['g'],b:item['shade3']['b']};
            delete item['shade3']['r'];
            delete item['shade3']['g'];
            delete item['shade3']['b'];
        });
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
};

exports.create = async (req, res) => {
    try {
        if(!req.body.shade1Id || !req.body.shade2Id || !req.body.shade3Id) {
            throw "Shade id's is missing";
        }
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
    if(!id){ 
        throw "Id is missing or incorrect.";
    }
    if (req.file) {
        updateColorTrends['image'] = req.file.filename;
        const { image } = await ColorTrends.find({ where: { id: req.params.id }, raw: true });
        fs.unlinkSync(`${keys.storage}/${image}`);
    } else {
        delete updateColorTrends["image"];
    }
    try {
        await ColorTrends.update(updateColorTrends, { where: { id } });
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
        if(!id) {
            throw "id is missing or incorrect format";
        }
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
