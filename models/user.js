'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // username: {
    //   type: DataTypes.STRING,
    //   unique: {
    //     args: true,
    //     msg: 'Username must be unique'
    //   },
    //   allowNull: false,
    //   defaultValue: '',
    //   validate: {
    //     notEmpty: {
    //       msg: 'Username is required'
    //     },
    //     len: {
    //       args: [3, 40],
    //       msg: 'Please provide a username which must start with a letter, have no spaces, and be 3-40 characters in length'
    //     },
    //     is: {
    //       args: /^[A-Za-z][A-Za-z0-9-]+$/i,
    //       msg: 'Username must start with a letter, have no spaces, and be 3-40 characters in length'
    //     }
    //   }
    // },
    firstname: {
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue: '',
      validate: {
        isAlpha: {
          msg: 'First name should only contain alphabets'
        },
        len: {
          args: [2, 254],
          msg: 'Please provide an alphabetical first name which is 2-254 characters in length'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        isAlpha: {
          msg: 'Last name should only contain alphabets',
        },
        len: {
          args: [2, 254],
          msg: 'Please provide an alphabetical last name which is 2-254 characters in length'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        isAlpha: {
          msg: 'City name should only contain alphabets'
        },
        len: {
          args: [2, 254],
          msg: 'Please provide an alphabetical city name which is 2-254 characters in length'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [2, 254],
          msg: 'Please provide a valid phone number.'
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        isAlpha: {
          msg: 'Country name should only contain alphabets'
        },
        len: {
          args: [2, 254],
          msg: 'Please provide an alphabetical country name which is 2-254 characters in length'
        }
      }
    },
    profession: {
      type: DataTypes.ENUM({
        values: ['HOMEOWNER', 'ARCHITECT', 'INTERIORDESIGNER', 'BUILDER', 'DEVELOPER', 'OTHER']
      })
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Oops. Looks like you already have an account with this email address. Please try logging in'
      },
      allowNull: false,
      defaultValue: '',
      validate: {
        isEmail: {
          msg: 'Please provide a valid email address'
        }
      }
    },
    role: {
      type: DataTypes.ENUM({
        values: ['CUSTOMER', 'ADMIN', 'DEALER','DATAENTRY']
      }),
      defaultValue: 'CUSTOMER'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        len: {
          args: 6,
          msg: 'Please provide a password which is at least 6 characters long.'
        }
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    liked_products: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    liked_shades: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    liked_pallets: {
       type: DataTypes.STRING,
       defaultValue: null
    }
  }, {
      indexes: [
        {
          unique: true,
          fields: ['email', 'username']
        }
      ],
      defaultScope: {
        attributes: { exclude: ['password', 'updatedAt', 'createdAt'] }
      },
      scopes: {
        withPassword: {
          attributes: {}
        }
      }
    });

  User.prototype.getFullName = () => [this.firstname, this.lastname].join('.');

  User.prototype.comparePassword = function (password, cb) {
    return bcrypt.compare(password, this.password, cb);
  };

  const hashPassword = user => {
    if(!user.changed('password')) return
    return bcrypt.hash(user.password, 10).then(hash => user.password = hash)
  };

  User.beforeCreate(user => hashPassword(user));

  User.beforeUpdate(user => hashPassword(user));

  User.associate = function (models) {
    // associations can be defined here
    const { Dealer } = models;
    User.belongsTo(Dealer,{allowNull:true});
  };
  return User;
};
