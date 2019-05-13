const { Product, Country, Country_Product, Category } = require("../models");

exports.getAllProducts = async (req, res) => {
  let result;
  try {
    if (req.query.country) {
      result = await Product.findAll({
        include: [
          {
            model: Country,
            where: { id: req.query.country },
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
  const id = req.params.product_id;
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
    CategoryId,
    description,
    spreading,
    image,
    countries
  } = req.body;
  try {
    const product = await Product.create(
      {
        name,
        CategoryId,
        description,
        spreading,
        image
      },
      { raw: true }
    );
    for (let country of countries) {
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
  try {
    await Product.update(updateObject, { where: { id } });
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
