const { FinishType, Surface_Finish_type, Surface, Category, ProjectType } = require("../models");
const keys = require("../config/keys");
const fs = require('fs');

exports.getAll = async (req, res) => {
  try {
    const result = await FinishType.findAll({
      include: [
        {
          model: Surface,
          through: { attributes: [] },
          include: [
            {
              model: Category, 
              through: { attributes: [] },
              include: [ {model: ProjectType, through: { attributes: [] }} ]
            } 
          ]
        }
      ],
    });
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.create = async (req, res) => {
  const { name, SurfaceId } = req.body;
  try {
    let finishId = await FinishType.create({ name, image: req.file.filename, SurfaceId });
    finishId = JSON.parse(JSON.stringify(finishId))
    if (SurfaceId) {
      for (let id of JSON.parse(SurfaceId)) {
        await Surface_Finish_type.create({ SurfaceId: id, FinishTypeId: finishId.id })
      }
    }
    return res
      .status(200)
      .json({ success: true, message: "Project Type created successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.getSpecificFinish = async (req, res) => {
  const { surface_id } = req.body;
  try {
    if (!surface_id) {
      throw "Surface Id is not sent."
    }
    const result = await FinishType.findAll({
      include: [
        {
          model: Surface,
          through: { attributes: [] },
          where: { id: surface_id },
          attributes: []
        }
      ],
      attributes: ["id", "name", "image"]
    });
    return res
      .status(200)
      .json({ success: true, data: result });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
}
exports.update = async (req, res) => {
  const updateFinishType = req.body;
  const { id } = req.params;
  if (!id) {
    throw "Id is missing or incorrect format";
  }
  if (req.file) {
    updateFinishType['image'] = req.file.filename;
    const { image } = await FinishType.find({ where: { id: req.params.id }, raw: true });
    fs.unlinkSync(`${keys.storage}/${image}`);
  } else {
    delete updateFinishType["image"];
  }

  try {
    await FinishType.update(updateFinishType, { where: { id } });
    if (updateFinishType['SurfaceId']) {
      await Surface_Finish_type.destroy({ where: { FinishTypeId: id } });
      for (let sid of JSON.parse(updateFinishType['SurfaceId'])) {
        await Surface_Finish_type.create({ SurfaceId: sid, FinishTypeId: id })
      }
    }
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
    if (!id) {
      throw "Id is missing or incorrect format";
    }
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
