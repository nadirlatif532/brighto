'use strict';

module.exports = (sequelize, DataTypes) => {
  const Dealer = sequelize.define('Dealer', {
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
