const { City, Country } = require('../models');

exports.createCity = async (req, res) => {
    try {
        const { name, CountryId } = req.body;
        await City.create({ name, CountryId });
        return res.status(200).json({ success: true, message: 'City created successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.updateCity = async (req, res) => {
    const updateObject = req.body;
    const { id } = req.params;
    updateObject['CountryId'] = updateObject.CountryId;
    try {
        if(!id) {
            throw "Id is missing or incorrect format";
        }
        await City.update(
            updateObject,
            { where: { id } }
        );
        return res.status(200).json({ success: true, message: 'City updated successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.deleteCity = async (req, res) => {
    const { id } = req.params;
    try {
        if(!id) {
            throw "Id is missing or incorrect format";
        }
        await City.destroy({
            where: {
                id
            }
        });
        return res.status(200).json({ success: true, message: 'City deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getAllCities = async (req, res) => {
    try {
        const result = await City.findAll({
            include: {
                model: Country,
                attributes: ["id", "name"]
            }
        });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, errors: err });
    }
}