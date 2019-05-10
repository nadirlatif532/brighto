'use strict';

module.exports = (sequelize, DataTypes) => {
  const Dealer = sequelize.define('Dealer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        isAlpha: {
          msg: 'Dealer name should only contain alphabets',
        },
        len: {
          args: [2, 254],
          msg: 'Please provide an alphabetical last name which is 2-254 characters in length'
        }
      }
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
