const { FinishType } = require("../models");
const keys = require("../config/keys");
const fs = require('fs');

exports.getAll = async (req, res) => {
  try {
    const result = await FinishType.findAll({});
    return res.status(200).json({ success: true, data: result });
  } catch {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    await FinishType.create({ name, image: req.file.filename });
    return res
      .status(200)
      .json({ success: true, message: "Project Type created successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.getSpecificFinish = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) {
      throw "Surface Id is not sent."
    }
    const result = await FinishType.findAll({ where: { SurfaceId: id } });
    return res
      .status(200)
      .json({ success: true, message: result });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
}
exports.update = async (req, res) => {
  const updateFinishType = req.body;
  const { id } = req.params;
  if (req.file) {
    updateFinishType['image'] = req.file.filename;
    const { image } = await FinishType.find({ where: { id: req.params.id }, raw: true });
    fs.unlinkSync(`${keys.storage}/${image}`);
  } else {
    delete updateFinishType["image"];
  }

  try {
    await FinishType.update(updateFinishType, { where: { id } });
    return res
      .status(200)
      .json({ success: true, message: "FinishType updated successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const { image } = await FinishType.find({ where: { id: id }, raw: true });
  fs.unlinkSync(`${keys.storage}/${image}`);
  try {
    await FinishType.destroy({
      where: {
        id
      }
    });
    return res
      .status(200)
      .json({ success: true, message: "FinishType deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};
