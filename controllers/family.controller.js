const { Family, Shades, Country, ShadeFilter } = require('../models');

exports.createColor = async (req, res) => {
  /*Expects an object with the format:
   {name:"Red",r:255,g:101,b:0}
 */
  try {
    const { name, r, g, b, ShadeFilter, sequence } = req.body;
    let id = ShadeFilter['id'];
    await Family.create({
      name, r, g, b, ShadeFilterId: id, sequence
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
  let updateObject = req.body;
  updateObject['ShadeFilterId'] = updateObject['ShadeFilter']['id'];
  const { id } = req.params;
  try {
    if (!id) {
      throw "Id is missing or incorrect format";
    }
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
    if (!id) {
      throw "Id is missing or incorrect format";
    }
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
    let result = await Family.findAll({ 
      include: [
        {
          model: ShadeFilter
        }
      ],
      order: ['sequence']
    });
    result = JSON.parse(JSON.stringify(result));
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

exports.getShadeDetails = async (req, res) => {
  const { color_id, shade_id } = req.body;
  try {
    if (!color_id || !shade_id) {
      throw "Color Id or Shade Id is missing";
    }
    let result = await Shades.findAll({
      where: { id: shade_id },
      include: [{
        model: Family,
        where: { id: color_id },
      }]
    });
    result = JSON.parse(JSON.stringify(result));
    result.map((item) => {
      if (item['Family']) {
        item['Family']['color'] = { r: item['Family']['r'], g: item['Family']['g'], b: item['Family']['b'] };
        delete item['Family']['r'];
        delete item['Family']['g'];
        delete item['Family']['b'];
      }
    });
    return res.status(200).json({ success: true, result });
  }
  catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
}