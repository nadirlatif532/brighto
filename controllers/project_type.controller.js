const { ProjectType } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const result = await ProjectType.findAll({});
    return res.status(200).json({ success: true, data: result });
  } catch {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    await ProjectType.create({ name, image:req.file.originalname });
    return res
      .status(200)
      .json({ success: true, message: "Project Type created successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.update = async (req, res) => {
  const updateProjectType = req.body;
  const { id } = req.params;
  if(req.file) {
    updateProjectType['image'] = req.file.originalname;
  }
  try {
    await ProjectType.update(updateProjectType, { where: { id } });
    return res
      .status(200)
      .json({ success: true, message: "ProjectType updated successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await ProjectType.destroy({
      where: {
        id
      }
    });
    return res
      .status(200)
      .json({ success: true, message: "ProjectType deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};
