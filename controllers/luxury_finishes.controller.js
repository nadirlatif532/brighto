const { LuxuryFinishes } = require("../models");
const fs = require('fs');
const keys = require('../config/keys');

exports.create = async (req, res) => {
    const { name, description, video } = req.body;
    try {
        await LuxuryFinishes.create({
            name,
            image1: req.files['image1'] && req.files['image1'][0].filename || "",
            image2: req.files['image2'] && req.files['image2'][0].filename || "",
            image3: req.files['image3'] && req.files['image3'][0].filename || "",
            productImage: req.files['image4'] && req.files['image4'][0].filename || "",
            description,
            video,
            coverImage: req.files['coverImage'] && req.files['coverImage'][0].filename || ""
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
    console.log(req.body);
    const updateLuxuryFinish = req.body;
    try {
        if (!id) {
            throw "Id is missing or incorrect format";
        }
        console.log(req.files['image']);
        if (req.files['image1']) {
            updateLuxuryFinish['image1'] = req.files['image1'][0].filename;
            const { image1 } = await LuxuryFinishes.find({ where: { id: req.params.id }, raw: true });
            fs.unlinkSync(`${keys.storage}/${image1}`);
        } else {
            delete updateLuxuryFinish['image1'];
        }
        if (req.files['image2']) {
            updateLuxuryFinish['image2'] = req.files['image2'][0].filename;
            const { image2 } = await LuxuryFinishes.find({ where: { id: req.params.id }, raw: true });
            fs.unlinkSync(`${keys.storage}/${image2}`);
        } else {
            delete updateLuxuryFinish['image2'];
        }
        if (req.files['image3']) {
            updateLuxuryFinish['image3'] = req.files['image3'][0].filename;
            const { image3 } = await LuxuryFinishes.find({ where: { id: req.params.id }, raw: true });
            fs.unlinkSync(`${keys.storage}/${image3}`);
        }
        else {
            delete updateLuxuryFinish['image3'];
        }
        if (req.files['image4']) {
            updateLuxuryFinish['image4'] = req.files['image4'][0].filename;
            const { image4 } = await LuxuryFinishes.find({ where: { id: req.params.id }, raw: true });
            fs.unlinkSync(`${keys.storage}/${image4}`);
        }
        else {
            delete updateLuxuryFinish['image4'];
        }
        if (req.files['coverImage']) {
            updateLuxuryFinish['coverImage'] = req.files['coverImage'][0].filename;
            const { coverImage } = await LuxuryFinishes.find({ where: { id: req.params.id }, raw: true });
            fs.unlinkSync(`${keys.storage}/${coverImage}`);
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
        result = result.map((item)=>{
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
        result = result.map((item)=>{
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