const {User} = require('../models');
exports.getUsers = async (req, res) => {
    try {
        const result = await User.findAll({});
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}