const { Family, Shades, Country } = require('../models');

exports.createColor = async (req, res) => {
  /*Expects an object with the format:
   {name:"Red",rgb:"#FFFFFF"}
 */
  try {
    req.body['name'] = req.body.name.toLowerCase();
    const { name, rgb } = req.body;
    await Family.create({
      name, rgb
    });
    return res.status(200).json({ success: true, message: 'Color created successfully' });
  }
  catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
}

exports.updateColor = async (req, res) => {
  /*Expects an object with the format:
    if name only:  {name: 'Red'},
    if rgb only:  {rgb: '#FFFFFF},
    if both :  {name: 'Red', rgb: '#FFFFFF}
  */
  const updateObject = req.body;
  const { id } = req.params;
  try {
    await Family.update(
      updateObject,
      { where: { id } }
    );
    return res.status(200).json({ success: true, message: 'Color updated successfully' });
  }
  catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
}

exports.deleteColor = async (req, res) => {
  const { id } = req.params;
  try {
    await Family.destroy({
      where: {
        id
      }
    });
    return res.status(200).json({ success: true, message: 'Color deleted successfully' });
  }
  catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
}

exports.getColorDetails = async (req, res) => {
  req.params['color'] = req.params['color'].toLowerCase();
  const { color } = req.params;
  let result;
  try {
    if (req.query.country) {
      result = await Family.findAll({
        where: { name: color },
        include: {
          model: Shades,
          through: { attributes: [] },
          include: {
            model: Country,
            where: { name: req.query.country },
            through: { attributes: [] }
          }
        }
      });
    }
    else {
      result = await Family.findAll({
        where: { name: color },
        include: {
          model: Shades,
          through: { attributes: [] },
        }
      });
    }
    return res.status(200).json({ success: true, message: result });
  }
  catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
}

exports.getShadeDetails = async (req, res) => {
  req.params['color'] = req.params['color'].toLowerCase();
  const { color, shade } = req.params;
  try {
    const result = await Family.findAll({
      where: { name: color },
      include: {
        model: Shades,
        where: { id: shade },
        required: true,
        through: { attributes: [] }
      }
    });
    return res.status(200).json({ success: true, message: result });
  }
  catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
}