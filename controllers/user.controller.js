const { User } = require('../models');
exports.getUsers = async (req, res) => {
    try {
        const result = await User.findAll({});
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.getSpecificUser = async (req, res) => {
    try {
        res.status(200).json({ success: true, data: req.user });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw "Id is missing or incorrect format";
    }
    try {
        let user = await User.scope('withPassword').findOne({ where: { id } })
        const updateObject = req.body;
        if (updateObject['oldPassword'] && updateObject['newPassword']) {
            await user.comparePassword(updateObject['oldPassword']);
            updateObject['password'] = updateObject['newPassword'];
        }
        await user.update(updateObject, { where: { id } })
        return res
            .status(200)
            .json({ success: true, message: "User updated successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw "Id is missing or incorrect format";
    }
    try {
        await User.destroy({
            where: {
                id
            }
        });
        return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}