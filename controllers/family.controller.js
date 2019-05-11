const { Family, Shades, Country } = require('../models');

exports.createColor = async (req, res) => {
  /*Expects an object with the format:
   {name:"Red",r:255,g:101,b:0}
 */
  try {
    const { name, r,g,b } = req.body;
    await Family.create({
      name, r,g,b
    });
    return res.status(200).json({ success: true, message: 'Color created successfully' });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
}

exports.updateColor = async (req, res) => {
  /*Expects an object with the format:
    if name only:  {name: 'Red'},
    if rgb only:  {r: 255, g: 101, b: 0},
    if both :  {name: 'Red', r: 255, g: 101, b: 0}
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
    return res.status(500).json({ success: false, errors: err });
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
    return res.status(500).json({ success: false, errors: err });
  }
}

exports.getAllColors = async (req, res) => {
  try {
    const result = await Family.findAll({});
    return res.status(200).json({ success: true, data: result });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
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
    } else {
      result = await Family.findAll({
        where: { name: color },
        include: {
          model: Shades,
          through: { attributes: [] },
        }
      });
    }
    return res.status(200).json({ success: true, result });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
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
    return res.status(200).json({ success: true, result });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
}