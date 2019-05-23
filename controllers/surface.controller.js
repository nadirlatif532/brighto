const { Surface } = require("../models");
const fs = require('fs');
const keys = require('../config/keys');

exports.getAll = async (req, res) => {
  try {
    const result = await Surface.findAll({});
    return res.status(200).json({ success: true, data: result });
  } catch {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    await Surface.create({ name, image: req.file.filename });
    return res
      .status(200)
      .json({ success: true, message: "Surface created successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.update = async (req, res) => {
  const updateSurface = req.body;
  const { id } = req.params;

  if(req.file) {
    updateSurface['image'] = req.file.filename;
    const { image } = await Surface.find({ where: { id: req.params.id }, raw: true });
    fs.unlinkSync(`${keys.storage}/${image}`);
  } else {
    delete updateSurface["image"];
  }

  try {
    await Surface.update(updateSurface, { where: { id } });
    return res
      .status(200)
      .json({ success: true, message: "Surface updated successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};


exports.getSpecificSurface = async (req,res) => {
  const { id } = req.body;
  try {
    if (!id) {
      throw "Category Id is is not sent.";
    }
    const result = await Surface.findAll({ where: { CategoryId: id } })
    return res
      .status(200)
      .json({ success: true, message: result });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
}
exports.delete = async (req, res) => {
  const { id } = req.params;
  const { image } = await Surface.find({ where: { id: id }, raw: true });
  fs.unlinkSync(`${keys.storage}/${image}`);
  try {
    await Surface.destroy({
      where: {
        id
      }
    });
    return res
      .status(200)
      .json({ success: true, message: "Surface deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};
