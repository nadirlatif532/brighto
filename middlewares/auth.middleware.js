const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { User } = require('../models');

module.exports.authenticate = async (req, res, next) => {
  const header = req.headers.authorization;

  if (header) {
    const token = header.split(' ')[1];
    jwt.verify(token, keys.jwtSecret, { algorithms: 'HS256' }, (err, decoded) => {
      if (err) return res.json({ success: false, message: 'Authorization token invalid' });

      if (decoded) {
        User.findOne({ where: { id: decoded.sub } }).then(user => {
          req.user = user;
          next();
        });
      }
    });
  } else {
    return res.json({ success: false, message: 'Authorization token not found' })
  }
};

module.exports.isAdmin = async (req, res, next) => {
  if (req.user.role == 'ADMIN') {
    next();
  } else {
    return res.json({ success: false, message: 'Insufficient privilege: Not authorized.' });
  }
};

module.exports.isAdminOrDataEntry = async (req, res, next) => {
  if (req.user.role == 'ADMIN' || req.user.role == 'DATAENTRY') {
    next();
  }
  else {
    return res.json({ success: false, message: 'Insufficient privilege: Not authorized.' });
  }
}