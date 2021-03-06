const { Dealer, Country, City } = require('../models');

exports.createDealer = async (req, res) => {
    try {
        const { name, address, longitude, latitude, phone, isAC, isRM, CountryId, CityId, sequence } = req.body;
        let result = await Dealer.create({ name, address, longitude, latitude, phone, isAC, isRM, CountryId, CityId, sequence });
        result = JSON.parse(JSON.stringify(result));
        return res.status(200).json({ success: true, message: 'Dealer created successfully', data: result.id });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.updateDealer = async (req, res) => {
    const updateObject = req.body;
    const { id } = req.params;
    try {
        if (!id) {
            throw "Id is missing or incorrect format";
        }
        await Dealer.update(
            updateObject,
            { where: { id } }
        );
        return res.status(200).json({ success: true, message: 'Dealer updated successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.deleteDealer = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            throw "Id is missing or incorrect format";
        }
        await Dealer.destroy({
            where: {
                id
            }
        });
        return res.status(200).json({ success: true, message: 'Dealer deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getAllDealers = async (req, res) => {
    try {
        const result = await Dealer.findAll({

            include: [
                {
                    model: Country
                },
                {
                    model: City,
                    include: [
                        {
                            model: Country
                        }
                    ]
                }
            ],
            order: ['sequence']
        });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getSpecificDealer = async (req, res) => {
    const { dealer_id } = req.body;
    try {
        if (!dealer_id) {
            throw "Dealer Id is missing.";
        }
        const result = await Dealer.findAll({
            attributes: ["id", "name", "address", "longitude", "latitude", "phone", "isAC", "isRM", "createdAt", "updatedAt"],
            where: { id: dealer_id },
            include: [
                {
                    model: Country
                },
                {
                    model: City
                }
            ]
        });
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getCountryDealers = async (req, res) => {
    const { country_id } = req.body;
    try {
        if (!country_id) {
            throw "Country Id missing";
        }
        const result = await Dealer.findAll({
            where: { CountryId: country_id },
            order: ['sequence']
        });
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getCityDealers = async (req, res) => {
    const { city_id } = req.body;
    try {
        if (!city_id) {
            throw "City Id missing";
        }
        const result = await Dealer.findAll({
            where: { CityId: city_id },
            order: ['sequence']
        });
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}