'use strict';

module.exports = (sequelize, DataTypes) => {
  const Dealer = sequelize.define('Dealer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        len: {
          args: [2, 254],
          msg: 'Please provide an alphabetical last name which is 2-254 characters in length'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    isAC: {
      type: DataTypes.BOOLEAN
    },
    isRM: {
      type: DataTypes.BOOLEAN
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
      defaultScope: {
        attributes: { exclude: ['updatedAt', 'createdAt'] }
      }
    });

  Dealer.associate = function (models) {
    // associations can be defined here
    const { Country, City, Order } = models;
    Dealer.belongsTo(Country);
    Dealer.belongsTo(City);
  };
  return Dealer;
};
