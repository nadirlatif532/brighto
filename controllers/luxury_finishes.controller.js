const { LuxuryFinishes } = require("../models");
const fs = require('fs');
const keys = require('../config/keys');

exports.create = async (req, res) => {
    const { name, description } = req.body;
    try {
        await LuxuryFinishes.create({ name, image: req.files['image'][0].filename, description });
        return res.status(200).json({ success: true, message: "Luxury Finishes created successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.updateFinish = async (req, res) => {
    const { id } = req.params;
    const updateLuxuryFinish  = req.body;
    try {
        if(!id) {
            throw "Id is missing or incorrect format";
        }
        if (req.files['image']) {
            updateLuxuryFinish['image'] = req.files['image'][0].filename;
            const { image } = await LuxuryFinishes.find({ where: { id: req.params.id }, raw: true });
            fs.unlinkSync(`${keys.storage}/${image}`);
          }
        else {
             delete updateLuxuryFinish["image"];
        }
        await LuxuryFinishes.update(updateLuxuryFinish, { where: { id } });
        return res.status(200).json({ success: true, message: 'Luxury Finish updated successfully' });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            throw "Id is missing or incorrect format";
        }
        await LuxuryFinishes.destroy({
            where: {
                id
            }
        });
        return res.status(200).json({ success: true, message: 'Luxury Finish deleted successfully' });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getAllFinishes = async (req, res) => {
    try {
        const result = await LuxuryFinishes.findAll({});
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getSpecificFinish = async (req, res) => {
    try {
        const { finish_id } = req.body;
        const result = await LuxuryFinishes.findAll({ where: {id: finish_id }});
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}