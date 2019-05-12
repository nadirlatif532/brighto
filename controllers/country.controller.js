const { Country } = require('../models');

exports.createCountry = async (req,res) => {
    try{
        const {name} = req.body;
        await Country.create({name});
        return res.status(200).json({ success: true, message: 'Country created successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.updateCountry = async (req,res) => {
    const updateObject = req.body;
    const { id } = req.params;
    try {
        await Country.update(
            updateObject,
            { where: { id } }
          );
        return res.status(200).json({ success: true, message: 'Country updated successfully' });
    }
    catch(err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.deleteCountry = async (req,res) => {
    const { id } = req.params;
    try {
      await Country.destroy({
        where: {
          id
        }
      });
      return res.status(200).json({ success: true, message: 'Country deleted successfully' });
    }
    catch (err) {
      return res.status(500).json({ success: false, errors: err });
    }
}

exports.getAllCountries = async (req,res) => {
    try{
        const result = await Country.findAll({});
        return res.status(200).json({ success: true, result });
    }
    catch(err) {
        return res.status(500).json({ success: false, errors: err });
    }
}