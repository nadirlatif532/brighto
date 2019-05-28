const { Surface, Category_Surface, Surface_Finish_type, Category, FinishType, ProjectType } = require("../models");
const fs = require('fs');
const keys = require('../config/keys');

exports.getAll = async (req, res) => {
  try {
    const result = await Surface.findAll({
      include: [
        {
          model: Category,
          through: { attributes: [] },
          attributes: ["id", "name", "image"],
          include: [ {model: ProjectType, attributes: ["id", "name", "image"], through: { attributes: [] }} ]
        }
      ],
      attributes: ["id", "name", "image"]
    });
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.create = async (req, res) => {
  const { name, CategoryId, FinishTypeId } = req.body;
  try {
    let surfaceId = await Surface.create({ name, image: req.file.filename });
    surfaceId = JSON.parse(JSON.stringify(surfaceId))
    if (FinishTypeId) {
      for (let id of FinishTypeId) {
        await Surface_Finish_type.create({ FinishTypeId: id, SurfaceId: surfaceId.id })
      }
    }
    if (CategoryId) {
      for (let id of JSON.parse(CategoryId)) {
        await Category_Surface.create({ SurfaceId: surfaceId.id, CategoryId: id })
      }
    }
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
  if (!id) {
    throw "Id is missing or incorrect format";
  }
  if (req.file) {
    updateSurface['image'] = req.file.filename;
    const { image } = await Surface.find({ where: { id: req.params.id }, raw: true });
    fs.unlinkSync(`${keys.storage}/${image}`);
  } else {
    delete updateSurface["image"];
  }

  try {
    await Surface.update(updateSurface, { where: { id } });
    if (updateSurface['FinishTypeId']) {
      await Surface_Finish_type.destroy({ where: { SurfaceId: id } });
      for (let sid of JSON.parse(updateSurface['FinishTypeId'])) {
        await Surface_Finish_type.create({ FinishTypeId: sid, SurfaceId: id })
      }
    }
    if (updateSurface['CategoryId']) {
      await Category_Surface.destroy({ where: { SurfaceId: id } });
      for (let cid of JSON.parse(updateSurface['CategoryId'])) {
        await Category_Surface.create({ CategoryId: cid, SurfaceId: id })
      }
    }
    return res
      .status(200)
      .json({ success: true, message: "Surface updated successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};


exports.getSpecificSurface = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) {
      throw "Category Id is is not sent.";
    }
    const result = await Surface.findAll({
      include: [
        {
          model: Category,
          through: { attributes: [] },
          where: { id: id },
          attributes: ["id", "name", "image"]
        }
      ],
      attributes: ["id", "name", "image"]
    })
    return res
      .status(200)
      .json({ success: true, data: result });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
}
exports.delete = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw "Id is missing or incorrect format";
  }
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
