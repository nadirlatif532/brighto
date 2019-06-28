const { Packaging } = require("../models");
const fs = require('fs');
const keys = require("../config/keys")

exports.getAll = async (req, res) => {
    try {
        const result = await Packaging.findAll({});
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
};

exports.create = async (req, res) => {
    const { name } = req.body;
    try {
        await Packaging.create({ name, image: req.files['image'][0].filename });
        return res
            .status(200)
            .json({ success: true, message: "Packaging created successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, errors: err });
    }
};

exports.getSpecificPackaging = async (req, res) => {
    const { packaging_id } = req.body;
    try {
      if (!packaging_id) {
        throw "Surface Id is not sent."
      }
      const result = await Packaging.findAll({where: {id: packaging_id}});
      return res
        .status(200)
        .json({ success: true, data: result });
    }
    catch (err) {
      return res.status(500).json({ success: false, errors: err });
    }
}

exports.update = async (req,res) => {
    const updatePackagingObject = req.body;
    const { id } = req.params;
    if (!id) {
      throw "Id is missing or incorrect format";
    }
    if (req.files['image']) {
      updatePackagingObject['image'] = req.files['image'][0].filename;
      const { image } = await Packaging.find({ where: { id: req.params.id }, raw: true });
      fs.unlinkSync(`${keys.storage}/${image}`);
    } else {
      delete updatePackagingObject["image"];
    }
  
    try {
      await Packaging.update(updatePackagingObject, { where: { id } });
      return res
        .status(200)
        .json({ success: true, message: "Packaging updated successfully" });
    } catch (err) {
      return res.status(500).json({ success: false, errors: err });
    }
}

exports.delete = async (req,res) => {
    const { id } = req.params;
    const { image } = await Packaging.find({ where: { id: id }, raw: true });
    fs.unlinkSync(`${keys.storage}/${image}`);
    try {
      if (!id) {
        throw "Id is missing or incorrect format";
      }
      await Packaging.destroy({
        where: {
          id
        }
      });
      return res
        .status(200)
        .json({ success: true, message: "Packaging deleted successfully" });
    } catch (err) {
      return res.status(500).json({ success: false, errors: err });
    }
}
