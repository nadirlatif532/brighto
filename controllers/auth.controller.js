const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const {User} = require('../models');
const mail = require('../utils/email.util');

exports.signup = async (req, res) => {
  const {username, firstname, lastname, email, password} = req.body;

  try {
    User.build({username, firstname, lastname, email, password}).validate()
        .then((user) => {
          return user.save();
        })
        .then(() => {
          res.status(201).json({success: true, message: 'User created successfully'});
        })
        .catch(errors => {
          let errObj = JSON.parse(JSON.stringify(errors))['errors'].map((err)=>{
            return err['message']
          });
          res.status(400).json({success: false, errors: errObj});
        });
  } catch (e) {
    return res.status(400).json({success: false, errors: e})
  }
};

exports.login = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!username && !email) throw "Email, username not found.";
    if (!password) throw "Password not found";

    let user = await User.scope('withPassword').findOne({where: {
      $or: [
        {
          email: {
            $eq: email
          }
        }, {
          username: {
            $eq: username
          }
        }
      ]
    }});
  
    if (!user) {
      return res.status(400).json({success: false, errors: "Email or username does not exist."});
    }

    user.comparePassword(password, (err, result) => {
      if (err) return res.status(500).json({success: false, message: 'Something went wrong', errors: err});
  
      if (result) {
        jwt.sign({sub: user.id}, keys.jwtSecret, (err, token) => {
          if (err) return err;
          user = JSON.parse(JSON.stringify(user));
          delete user["password"];
          res.status(200).json({success: true, token: token, data: user});
        });
      } else {
        res.status(401).json({success: false, errors: "Incorrect password" });
      }
    });    
  } catch(err) {
    return res.status(500).json({ success: false, errors: err });
  }
};

exports.forgotPassword = async (req, res) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({
      where: {email: email},
      attributes: ['id', 'firstname', 'password', 'createdAt'],
      raw: true
    });

    if (!user) {
      throw "Password reset link will be sent if the email exists in our system.";
    }

    const token = jwt.sign({sub: user.id}, (user.password + user.createdAt));

    const url = `${keys.host}/api/v1/u/reset-password/${token}`;
    const subject = '[Brighto] Forgotten password reset';
    const body = `
        <div>
            <h4>Hi ${user.firstname},</h4>      
            <p>
                You have requested a new password for your brighto account.
            </p>
            <p>
                You can reset your password by clicking the link below:
            </p>
            <a href="${url}" target="_blank">Reset your password</a>
            <p>
                Ignore this email if you did not request a new password.
            </p>
        </div>
    `;

    await mail(email, subject, body);
    return res.status(200).send({message: "Password reset link will be sent if the email exists in our system."});
  } catch (e) {
    return res.status(401).json({message: e});
  }
};

exports.resetPassword = async (req, res) => {
  const decoded = jwt.decode(req.params.token);
  try {
    const user = await User.findOne({
      where: {id: decoded.sub},
      attributes: ['firstname', 'email', 'password', 'createdAt'],
      raw: true
    });

    jwt.verify(req.params.token, (user.password + user.createdAt), {
      algorithms: 'HS256',
      maxAge: "1h"
    }, async (err, token) => {
      if (err) {
        return res.status(401).json({success: false, message: "The token is expired or invalid"});
      }

      await User.update(
          {password: req.body.password},
          {where: {id: token.sub}, individualHooks: true}
      );

      const subject = '[Brighto] Password has been reset'
      const body = `
        <div>
            <h4>Hi ${user.firstname},</h4>
            <p>Your brighto password has been reset for account ${user.email}.</p>
        </div>
      `;

      await mail(user.email, subject, body);
      res.status(200).json({success: true, message: 'Password has been reset'});
    });
  } catch (e) {
    res.status(400).json({message: 'Something went wrong'});
  }
};
