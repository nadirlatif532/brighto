const { Family, Shades, Country } = require('../models');

exports.createColor = async (req, res) => {
  /*Expects an object with the format:
   {name:"Red",r:255,g:101,b:0}
 */
  try {
    const { name, r, g, b } = req.body;
    await Family.create({
      name, r, g, b
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
    const result = await Family.findAll({ raw: true });
    result.map((item) => {
      item['color'] = { r: item['r'], g: item['g'], b: item['b'] };
      delete item['r'];
      delete item['g'];
      delete item['b'];
    });
    return res.status(200).json({ success: true, data: result });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
}


exports.getColorDetails = async (req, res) => {
  const { color_id, country_id } = req.body;
  try {
    if (!color_id || !country_id) {
      throw "Color Id or Country Id is missing";
    }
    let result = await Family.findAll({
      where: { id: color_id },
      include: {
        model: Shades,
        through: { attributes: [] },
        include: {
          model: Country,
          where: { id: country_id },
          through: { attributes: [] }
        }
      }
    });

    result = JSON.parse(JSON.stringify(result));
    result.map((item) => {
      item['color'] = { r: item['r'], g: item['g'], b: item['b'] };
      delete item['r'];
      delete item['g'];
      delete item['b'];
      item['Shades'].map((shade) => {
        shade['color'] = { r: shade['r'], g: shade['g'], b: shade['b'] };
        delete shade['r'];
        delete shade['g'];
        delete shade['b'];
      })
    });
    return res.status(200).json({ success: true, result });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
}

exports.getShadeDetails = async (req, res) => {
  const { color_id, shade_id } = req.params;
  try {
    let result = await Family.findAll({
      where: { id: color_id },
      include: {
        model: Shades,
        where: { id: shade_id },
        required: true,
        through: { attributes: [] }
      }
    });
    result = JSON.parse(JSON.stringify(result));
    result.map((item) => {
      item['color'] = { r: item['r'], g: item['g'], b: item['b'] };
      delete item['r'];
      delete item['g'];
      delete item['b'];
      item['Shades'].map((shade) => {
        shade['color'] = { r: shade['r'], g: shade['g'], b: shade['b'] };
        delete shade['r'];
        delete shade['g'];
        delete shade['b'];
      })
    });
    return res.status(200).json({ success: true, result });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
}