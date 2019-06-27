const { ProjectType } = require("../models");
const keys = require('../config/keys');
const fs = require('fs');

exports.getAll = async (req, res) => {
  try {
    const result = await ProjectType.findAll({
      attributes: ['id', 'image', 'name']
    });
    return res.status(200).json({ success: true, data: result });
  } catch(err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    await ProjectType.create({ name, image: req.files['image'][0].filename });
    return res
      .status(200)
      .json({ success: true, message: "Project Type created successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.update = async (req, res) => {
  const updateProjectType = req.body;
  const { id } = req.params;
  if (!id) {
    throw "Id is missing or incorrect format";
  }
  if (req.files['image']) {
    updateProjectType['image'] = req.files['image'][0].filename;
    const { image } = await ProjectType.find({ where: { id: req.params.id }, raw: true });
    fs.unlinkSync(`${keys.storage}/${image}`);
  } else {
    delete updateProjectType["image"];
  }

  try {
    await ProjectType.update(updateProjectType, { where: { id } });
    return res
      .status(200)
      .json({ success: true, message: "ProjectType updated successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw "Id is missing or incorrect format";
  }
  const { image } = await ProjectType.find({ where: { id: id }, raw: true });
  fs.unlinkSync(`${keys.storage}/${image}`);
  try {
    await ProjectType.destroy({
      where: {
        id
      }
    });
    return res
      .status(200)
      .json({ success: true, message: "ProjectType deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};
