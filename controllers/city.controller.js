const { City, Country, Dealer } = require('../models');
const db = require('../models/index');
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
        if (!id) {
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
        if (!id) {
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
            },
            order: ['sequence']
        });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getCitiesByCountry = async (req, res) => {
    const { country_id } = req.body;
    try {
        if (!country_id) {
            throw "Country Id missing";
        }
        const result = await City.findAll({
            where: { CountryId: country_id },
            order: ['sequence']
        }, { raw: true });
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getCitiesWithDealers = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            throw "City Id is missing";
        }
        let dealers = await db.sequelize.query("select * from Dealers", { type: db.sequelize.QueryTypes.SELECT })
        const cities = await db.sequelize.query("select * from Cities", { type: db.sequelize.QueryTypes.SELECT })
        let result = cities.map((item) => {
            return { city: item, dealer: dealers.filter((dealer) => dealer['CityId'] == item['id']) }
        });
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}