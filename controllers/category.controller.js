const { Category, Category_Surface, ProjectType_Category, Surface, ProjectType } = require("../models");
const fs = require('fs');
const keys = require('../config/keys');

exports.getAll = async (req, res) => {
  try {
    const result = await Category.findAll({
      include: [
        {
          model: Surface,
          through: { attributes: [] }
        },
        {
          model: ProjectType,
          through: { attributes: [] }
        }
      ]
    });
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.create = async (req, res) => {
  const { name, ProjectTypeId, SurfaceId } = req.body;
  try {
    if (!req.file.filename) {
      throw "No image was provided";
    }
    let categoryId = await Category.create({ name, image: req.file.filename });
    categoryId = JSON.parse(JSON.stringify(categoryId))
    if (ProjectTypeId) {
      for (let id of ProjectTypeId) {
        await ProjectType_Category.create({ ProjectTypeId: id, CategoryId: categoryId.id })
      }
    }
    if (SurfaceId) {
      for (let id of SurfaceId) {
        await Category_Surface.create({ SurfaceId: id, CategoryId: categoryId.id })
      }
    }
    return res
      .status(200)
      .json({ success: true, message: "Category created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, errors: err });
  }
};


exports.getSpecificCategory = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) {
      throw "Project Type Id is is not sent.";
    }
    const result = await Category.findAll({
      where: { ProjectTypeId: id },
      include: [
        {
          model: Surface,
          through: { attributes: [] }
        },
        {
          model: ProjectType,
          through: { attributes: [] }
        }
      ]
    })
    return res
      .status(200)
      .json({ success: true, data: result });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
}


exports.update = async (req, res) => {
  const updateCategory = req.body;
  if (req.file) {
    updateCategory['image'] = req.file.filename;
    const { image } = await Category.find({ where: { id: req.params.id }, raw: true });
    fs.unlinkSync(`${keys.storage}/${image}`);
  } else {
    delete updateCategory["image"];
  }
  const { id } = req.params;

  try {
    if (!id) {
      throw "No id was provided.";
    }
    await Category.update(updateCategory, { where: { id } });

    if (updateCategory['ProjectTypeId']) {
      await ProjectType_Category.destroy({ CategoryId: id });
      for (let pid of updateCategory['ProjectTypeId']) {
        await ProjectType_Category.update({ ProjectTypeId: pid, CategoryId: id })
      }
    }
    if (updateCategory['SurfaceId']) {
      await ProjectType_Category.destroy({ CategoryId: id });
      for (let sid of updateCategory['SurfaceId']) {
        await Category_Surface.update({ SurfaceId: sid, CategoryId: id })
      }
    }
    return res
      .status(200)
      .json({ success: true, message: "Category updated successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const { image } = await Category.find({ where: { id: id }, raw: true });
  fs.unlinkSync(`${keys.storage}/${image}`);
  try {
    if (!id) {
      throw "No Id was provided";
    }
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
