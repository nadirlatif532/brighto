'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    await queryInterface.bulkInsert('Dealers', [
      { name: 'John Doe', address: '634-F Walton Rd.', longitude: '32', latitude: '233', phone: "+92-3334353051", isAC: 1, isRM: 1 },
    ]);

    let dealers = await queryInterface.sequelize.query(
      `SELECT id from Dealers;`
    );
    dealers = dealers[0];
    /*Dealer ID na bhejo toh check karo*/
    await queryInterface.bulkInsert('Users', [
      { username: 'John Doe', firstname: 'John', lastname: 'Doe', email: 'john@gmail.com', role: "ADMIN", password: "john123", isActive: true, DealerId: dealers[0].id },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   await queryInterface.bulkDelete('User', null, {});
   await queryInterface.bulkDelete('Dealer', null, {});
  }
};
