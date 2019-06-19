const { Product, Country, Country_Product, Category, ProjectType, Surface, FinishType, Product_Shades, Shades } = require("../models");
const keys = require("../config/keys");
const db  = require('../models/index')
const fs = require('fs');

exports.getAllProducts = async (req, res) => {
  try {
    const result = await Product.findAll({});
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.getProductWithShades = async (req,res) => {
  const {id} = req.body;
  try {
      if(!id) {
          throw "City Id is missing";
      }
      const result = await Product.findAll({where:{id},include:[
        {
          model: Shades,
          through: { attributes: [] }
        }
      ]})
      return res.status(200).json({ success: true, data: result });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getProductByCountry = async (req, res) => {
  const { country_id } = req.body;
  try {
    if (!country_id) {
      throw "No Country id was sent.";
    }
    result = await Product.findAll({
      include: {
        model: Country,
        where: { id: country_id},
        through: { attributes: [] }
      }
    });

    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
}

exports.getSpecificProduct = async (req, res) => {
  const { product_id } = req.body;
  try {
    if (!product_id) {
      throw "No Product id was sent.";
    }
    const result = await Product.findAll({
      where: { id: product_id },
      include: [
        {
          model: Country,
          required: true,
          through: { attributes: [] }
        },
        {
          model: ProjectType
        },
        {
          model: Category,
          include: [
            {
              model: ProjectType,
              through: { attributes: [] }
            }
          ] 
        },
        {
          model: Surface,
          include: [
            {
              model: Category,
              through: { attributes: [] },
              include: [
                {
                  model: ProjectType,
                  through: { attributes: [] }
                }
              ]
            }  
          ]
        },
        {
          model: FinishType,
          include: [
            {
              model: Surface,
              through: { attributes: [] },
              include: [
                {
                  model: Category,
                  through: { attributes: [] },
                  include: [
                    {
                      model: ProjectType,
                      through: { attributes: [] }
                    }
                  ]
                }
              ]
            }
          ] 
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
        image: req.files['image'][0].filename,
        coverImage: req.files['coverImage'][0].filename
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
  if (!id) {
    throw "Id is missing or incorrect format";
  }
  if (req.files['image']) {
    updateObject['image'] = req.files['image'][0].filename;
    const { image } = await Product.find({ where: { id: req.params.id }, raw: true });
    fs.unlinkSync(`${keys.storage}/${image}`);
  }
  else {
     delete updateObject["image"];
  }
  if(req.files['coverImage']) {
    updateObject['coverImage'] = req.files['coverImage'][0].filename;
    const { coverImage } = await Product.find({ where: { id: req.params.id }, raw: true });
    fs.unlinkSync(`${keys.storage}/${coverImage}`);
  } else {
    delete updateObject["coverImage"];
  }
  try {
    await Product.update(updateObject, { where: { id } });
    if (updateObject['countries']) {
      await Country_Product.destroy({ where: { ProductId: id } });
      for (let country of JSON.parse(updateObject['countries'])) {
        await Country_Product.create({
          CountryId: country.id,
          ProductId: id
        });
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
  if (!id) {
    throw "Id is missing or incorrect format";
  }
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
    const { project_type_id, category_id, surface_id, finish_type_id } = req.body;
    const result = await Product.findAll({
      include: [
        {
          model: Category,
          where: { id: category_id },
          attributes: []
        },
        {
          model: Surface,
          where: { id: surface_id },
          attributes: []
        },
        {
          model: ProjectType,
          where: { id: project_type_id },
          attributes: []
        },
        {
          model: FinishType,
          where: { id: finish_type_id },
          attributes: []
        }
      ]
    });
    return res
      .status(200)
      .json({ success: true, data: result });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
}