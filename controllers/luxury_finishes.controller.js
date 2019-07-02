const { LuxuryFinishes } = require("../models");
const fs = require('fs');
const keys = require('../config/keys');

exports.create = async (req, res) => {
    try {
        const { name, description, video } = req.body;
        await LuxuryFinishes.create({
            name,
            image1: req.files['image4'] && req.files['image4'][0].filename || null,
            image2: req.files['image2'] && req.files['image2'][0].filename || null,
            image3: req.files['image3'] && req.files['image3'][0].filename || null,
            productImage: req.files['image1'] && req.files['image1'][0].filename || null,
            description,
            video,
            coverImage: req.files['coverImage'] && req.files['coverImage'][0].filename || null
        });
        return res.status(200).json({ success: true, message: "Luxury Finishes created successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.updateFinish = async (req, res) => {
    const { id } = req.params;
    const updateLuxuryFinish = req.body;
    try {
        if (!id) {
            throw "Id is missing or incorrect format";
        }
        if (req.files['image1']) {
            updateLuxuryFinish['productImage'] = req.files['image1'][0].filename;
            const { productImage } = await LuxuryFinishes.find({ where: { id: req.params.id }, raw: true });
            if (fs.existsSync(`${keys.storage}/${productImage}`)) {
                fs.unlinkSync(`${keys.storage}/${productImage}`);
            }
        } else {
            delete updateLuxuryFinish['productImage'];
        }
        if (req.files['image4']) {
            updateLuxuryFinish['image1'] = req.files['image4'][0].filename;
            const { image1 } = await LuxuryFinishes.find({ where: { id: req.params.id }, raw: true });
            if (fs.existsSync(`${keys.storage}/${image1}`)) {
                fs.unlinkSync(`${keys.storage}/${image1}`);
            }
        } else {
            delete updateLuxuryFinish['image1'];
        }
        if (req.files['image2']) {
            updateLuxuryFinish['image2'] = req.files['image2'][0].filename;
            const { image2 } = await LuxuryFinishes.find({ where: { id: req.params.id }, raw: true });
            if (fs.existsSync(`${keys.storage}/${image2}`)) {
                fs.unlinkSync(`${keys.storage}/${image2}`);
            }
        }
        else {
            delete updateLuxuryFinish['image2'];
        }
        if (req.files['image3']) {
            updateLuxuryFinish['image3'] = req.files['image3'][0].filename;
            const { image3 } = await LuxuryFinishes.find({ where: { id: req.params.id }, raw: true });
            if (fs.existsSync(`${keys.storage}/${image3}`)) {
                fs.unlinkSync(`${keys.storage}/${image3}`);
            }
        }
        else {
            delete updateLuxuryFinish['image3'];
        }
        if (req.files['coverImage']) {
            updateLuxuryFinish['coverImage'] = req.files['coverImage'][0].filename;
            const { coverImage } = await LuxuryFinishes.find({ where: { id: req.params.id }, raw: true });
            if (fs.existsSync(`${keys.storage}/${coverImage}`)) {
                fs.unlinkSync(`${keys.storage}/${coverImage}`);
            }
        } else {
            delete updateLuxuryFinish["coverImage"];
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
        let result = await LuxuryFinishes.findAll({});
        result = JSON.parse(JSON.stringify(result));
        result = result.map((item) => {
            item['images'] = [];
            item['images'].push(item['productImage']);
            delete item['productImage'];
            item['images'].push(item['coverImage']);
            delete item['coverImage'];
            item['images'].push(item['image1']);
            delete item['image1'];
            item['images'].push(item['image2']);
            delete item['image2'];
            item['images'].push(item['image3']);
            delete item['image3'];
            return item;
        })
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getSpecificFinish = async (req, res) => {
    try {
        const { finish_id } = req.body;
        let result = await LuxuryFinishes.findAll({ where: { id: finish_id } });
        result = JSON.parse(JSON.stringify(result));
        result = result.map((item) => {
            item['images'] = [];
            item['images'].push(item['productImage']);
            delete item['productImage'];
            item['images'].push(item['coverImage']);
            delete item['coverImage'];
            item['images'].push(item['image1']);
            delete item['image1'];
            item['images'].push(item['image2']);
            delete item['image2'];
            item['images'].push(item['image3']);
            delete item['image3'];
            return item;
        })
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}