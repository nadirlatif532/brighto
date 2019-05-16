const { Surface } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const result = await Surface.findAll({});
    return res.status(200).json({ success: true, data: result });
  } catch {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    await Surface.create({ name, image: req.file.originalname });
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
  if(req.file) {
    updateSurface['image'] = req.file.originalname;
  }
  try {
    await Surface.update(updateSurface, { where: { id } });
    return res
      .status(200)
      .json({ success: true, message: "Surface updated successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
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
