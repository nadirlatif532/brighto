const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const {User} = require('../models');

module.exports.checkRole = async (req, res, next) => {
  const header = req.headers.authorization;
  
  if (header) {
    const token = header.split(' ')[1];
    jwt.verify(token, keys.jwtSecret, {algorithms: 'HS256'}, (err, decoded) => {
      if (err) return res.json({success: false, message: 'Authorization token invalid'});

      if (decoded) {
        User.findOne({where: {id: decoded.sub}}).then(user => {
          if(user.role == 'ADMIN') {
            next();
          } else {
            return res.json({success: false, message: 'Insufficient privilege: Not authorized.'});
          }
          
        });
      }
    });
  } else {
    return res.json({success: false, message: 'Authorization token not found'})
  }
};
