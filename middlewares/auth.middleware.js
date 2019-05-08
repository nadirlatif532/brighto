const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const {User} = require('../models');

module.exports.authenticate = async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header.split(' ')[1];

  if (token) {
    jwt.verify(token, keys.jwtSecret, {algorithms: 'HS256'}, (err, decoded) => {
      if (err) return res.json({success: false, message: 'Authorization token invalid'});

      if (decoded) {
        User.findOne({where: {id: decoded.sub}}).then(user => {
          req.user = user;
          next();
        });
      }
    });
  } else {
    return res.json({success: false, message: 'Authorization token not found'})
  }
};
