const { User } = require('../models');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

exports.getUsers = async (req, res) => {
    try {
        const result = await User.findAll({});
        return res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}

exports.createUser = async (req, res) => {
    const { email, password, firstname, lastname, phone, role, profession, country, city } = req.body;

    try {
        User.build({ email, password, firstname, lastname, phone, role, profession, country, city }).validate()
            .then((user) => {
                return user.save();
            })
            .then((user) => {
                jwt.sign({ sub: user.id }, keys.jwtSecret, (err, token) => {
                    if (err) return err;
                    let userObject = JSON.parse(JSON.stringify(user));
                    delete userObject["password"];
                    res.status(201).json({ success: true, message: 'User created successfully', token: token, data: user });
                });
            })
            .catch(errors => {
                let errArray = JSON.parse(JSON.stringify(errors))['errors'] || [];
                let errObj = errArray.map((err) => {
                    return err['message']
                });
                res.status(400).json({ success: false, errors: errObj });
            });
    } catch (e) {
        return res.status(400).json({ success: false, errors: e })
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
            try {
                await user.comparePassword(updateObject['oldPassword']);
            } catch (err) {
                return res.status(500).json({ success: false, errors: "Old password was incorrect." });
            }
            updateObject['password'] = updateObject['newPassword'];
        }
        await user.update(updateObject, { where: { id } });
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