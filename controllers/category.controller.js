const { Category } = require("../models");

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
    await Category.create({ name });
    return res
      .status(200)
      .json({ success: true, message: "Category created successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.update = async (req, res) => {
  const updateCategory = req.body;
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
