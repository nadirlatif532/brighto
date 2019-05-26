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

    await queryInterface.bulkInsert('Categories', [
      { name: "Interior", image: '' },
      { name: "Exterior", image: '' },
    ]);

    await queryInterface.bulkInsert('ProjectTypes', [
      { name: "Pre-Painting", image: '' },
      { name: "Finishing", image: '' },
    ]);

    await queryInterface.bulkInsert('Surfaces', [
      { name: "Wall", image: '' },
      { name: "Wood", image: '' },
      { name: "Metal", image: '' },
      { name: "Plaster", image: '' },
    ]);

    await queryInterface.bulkInsert('FinishTypes', [
      { name: "Matt", image: '' },
      { name: "Glossy", image: '' },
      { name: "Texture", image: '' },
      { name: "Egg Shell", image: '' },
    ]);

    let surfaceId = await queryInterface.sequelize.query(
      `SELECT id from Surfaces;`
    );
    surfaceId = surfaceId[0];

    let projectTypeId = await queryInterface.sequelize.query(
      `SELECT id from ProjectTypes;`
    );
    projectTypeId = projectTypeId[0];

    let categoryId = await queryInterface.sequelize.query(
      `SELECT id from Categories;`
    );
    categoryId = categoryId[0];

    let finishTypeId = await queryInterface.sequelize.query(
      `SELECT id from FinishTypes;`
    );
    finishTypeId = finishTypeId[0];

    await queryInterface.bulkInsert('Products', [
      { name: "All Weather", description: "Hello", spreading: 21, isActive: true, image: "", CategoryId: categoryId[0].id, SurfaceId: surfaceId[0].id, ProjectTypeId: projectTypeId[0].id, FinishTypeId: finishTypeId[1].id },
      { name: "All Wood Coata", description: "World", spreading: 123, isActive: true, image: "", CategoryId: categoryId[1].id, SurfaceId: surfaceId[0].id, ProjectTypeId: projectTypeId[0].id, FinishTypeId: finishTypeId[0].id },
      { name: "Metallic Enamel", description: "Hello", spreading: 33, isActive: true, image: "", CategoryId: categoryId[0].id, SurfaceId: surfaceId[0].id, ProjectTypeId: projectTypeId[1].id, FinishTypeId: finishTypeId[0].id },
      { name: "Wall Emuslion", description: "World", spreading: 3, isActive: true, image: "", CategoryId: categoryId[1].id, SurfaceId: surfaceId[1].id, ProjectTypeId: projectTypeId[0].id, FinishTypeId: finishTypeId[0].id },
      { name: "Wall Putty", description: "Hello", spreading: 44, isActive: true, image: "", CategoryId: categoryId[0].id, SurfaceId: surfaceId[0].id, ProjectTypeId: projectTypeId[0].id, FinishTypeId: finishTypeId[0].id },
    ])

    let productId = await queryInterface.sequelize.query(
      `SELECT id from Products;`
    );

    productId = productId[0];

    await queryInterface.bulkInsert('Families', [
      { name: "Red", r: "200", g: "32", b: "44" },
      { name: "Blue", r: "10", g: "32", b: "245" },
      { name: "Green", r: "10", g: "245", b: "44" },
    ]);

    // await queryInterface.bulkInsert('Shades', [
    //   { name: "Shade 1", itemCode: "123", r: "200", g: "32", b: "44", isAC: true, isRM: true, description: "Hello World", ProductId: productId[0].id },
    //   { name: "Shade 2", itemCode: "1232", r: "200", g: "32", b: "44", isAC: true, isRM: false, description: "Hello World", ProductId: productId[1].id },
    //   { name: "Shade 3", itemCode: "12", r: "100", g: "24", b: "44", isAC: false, isRM: true, description: "Hello World", ProductId: productId[2].id },
    //   { name: "Shade 4", itemCode: "1223", r: "240", g: "32", b: "94", isAC: true, isRM: false, description: "Hello World", ProductId: productId[1].id },
    //   { name: "Shade 5", itemCode: "1233", r: "250", g: "32", b: "44", isAC: true, isRM: true, description: "Hello World", ProductId: productId[2].id },
    // ])

    await queryInterface.bulkInsert("Countries", [
      { name: "Pakistan" },
      { name: "Qatar" },
      { name: "China" },
      { name: "Kuwait" },
      { name: "Afghanistan" }
    ]);

    let countryId = await queryInterface.sequelize.query(
      `SELECT id from Countries;`
    );

    countryId = countryId[0];

    await queryInterface.bulkInsert("Country_Products", [
      { CountryId: countryId[0].id, ProductId: productId[0].id },
      { CountryId: countryId[1].id, ProductId: productId[1].id },
      { CountryId: countryId[2].id, ProductId: productId[2].id },
      { CountryId: countryId[3].id, ProductId: productId[3].id },
      { CountryId: countryId[4].id, ProductId: productId[4].id }
    ]);

  },



  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('Shades', null, {});
    await queryInterface.bulkDelete('Families', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
