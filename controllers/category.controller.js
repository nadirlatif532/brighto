const { Category } = require("../models");
const fs = require('fs');
const keys = require('../config/keys');


exports.getAll = async (req, res) => {
  try {
    const result = await Category.findAll({});
    return res.status(200).json({ success: true, data: result });
  } catch {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    await Category.create({ name, image: req.file.filename });
    return res
      .status(200)
      .json({ success: true, message: "Category created successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.update = async (req, res) => {
  const updateCategory = req.body;
  if (req.file) {
    updateCategory['image'] = req.file.filename;
    const { image } = await Category.find({ where: { id: req.params.id }, raw: true });
    fs.unlinkSync(`${keys.storage}/${image}`);
  }
  const { id } = req.params;

  try {
    await Category.update(updateCategory, { where: { id } });
    return res
      .status(200)
      .json({ success: true, message: "Category updated successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.destroy({
      where: {
        id
      }
    });
    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};
