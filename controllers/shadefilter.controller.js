const { ShadeFilter } = require("../models");

const ShadeFilter = async (req,res) => {
    try {
        const shades = await ShadeFilter.findAll({});
        return res.status(200).json({ success: true, data: shades });
    }
    catch(err) {
        return res.status(500).json({ success: false, errors: err });
    }
}