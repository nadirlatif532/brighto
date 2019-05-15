const { FinishType } = require("../models");

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
    await FinishType.create({ name });
    return res
      .status(200)
      .json({ success: true, message: "Project Type created successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.update = async (req, res) => {
  const updateFinishType = req.body;
  const { id } = req.params;

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
