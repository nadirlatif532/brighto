const { Product, Country, Country_Product, Category, ProjectType, Surface, FinishType } = require("../models");
const keys = require("../config/keys");
const fs = require('fs');

exports.getAllProducts = async (req, res) => {
  let result;
  try {
    if (req.body.country_id) {
      result = await Product.findAll({
        include: [
          {
            model: Country,
            where: { id: req.body.country_id },
            required: true,
            through: { attributes: [] }
          },
          {
            model: Category
          }
        ]
      });
    } else {
      result = await Product.findAll({
        include: [
          {
            model: Country,
            through: { attributes: [] }
          },
          {
            model: Category
          }
        ]
      });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.getSpecificProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findAll({
      where: { id },
      include: [
        {
          model: Country,
          required: true,
          through: { attributes: [] }
        },
        {
          model: Category
        },
        {
          model: Surface
        },
        {
          model: FinishType
        }
      ]
    });
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.createProduct = async (req, res) => {
  const {
    name,
    ProjectTypeId,
    CategoryId,
    SurfaceId,
    FinishTypeId,
    description,
    spreading,
    countries,
  } = req.body;
  try {
    const product = await Product.create(
      {
        name,
        ProjectTypeId,
        CategoryId,
        SurfaceId,
        FinishTypeId,
        description,
        spreading,
        image: req.file.filename
      },
      { raw: true }
    );
    for (let country of JSON.parse(countries)) {
      await Country_Product.create({
        ProductId: product["id"],
        CountryId: country["id"]
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Product created successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.updateProduct = async (req, res) => {
  /*Expects an object with the format: {name: 'Emulsion',description:'This is a good paint',is_active:1 ...}*/
  const updateObject = req.body;
  const { id } = req.params;
  if(req.file) {
    updateObject['image'] = req.file.filename;
    const { image } = await Product.find({ where: { id: req.params.id }, raw: true });
    fs.unlinkSync(`${keys.storage}/${image}`);
  }
  try {
    await Product.update(updateObject, { where: { id } });
    if (updateObject['Countries']) {
      for (let country of updateObject['Countries']) {
        await Country_Product.update({
          ProductId: id,
          CountryId: country["id"]
        }, { where: { id } });
      }
    }
    return res
      .status(200)
      .json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.destroy({
      where: {
        id
      }
    });
    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.getFilteredProduct = async (req, res) => {
  try {
    const { project_type, category, surface, finishtype } = req.query;
    const result = await Product.findAll({
      include: [
        {
          model: Category,
          where: { id: category },
          attributes: []
        },
        {
          model: Surface,
          where: { id: surface },
          attributes: []
        },
        {
          model: ProjectType,
          where: { id: project_type },
          attributes: []
        },
        {
          model: FinishType,
          where: { id: finishtype },
          attributes: []
        }
      ]
    });
    return res
      .status(200)
      .json({ success: true, result });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
}