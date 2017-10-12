'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Customers', [{
          name: 'Bambang',
          address: 'Jl. Sudirman',
          phone: '08122789819',
          email: 'bambang@gmail.com',
          UserId: 1,
          createdAt:new Date,
          updatedAt:new Date
      },{
          name: 'Rukmana',
          address: 'Jl. A. Yani',
          phone: '08122767354',
          email: 'rukmana@gmail.com',
          UserId: 2,
          createdAt:new Date,
          updatedAt:new Date
      },{
          name: 'Naiborhu',
          address: 'Jl. Kedongan',
          phone: '08122738223',
          email: 'naiborhu@gmail.com',
          UserId: 3,
          createdAt:new Date,
          updatedAt:new Date
      },{
          name: 'Prawiranegara',
          address: 'Jl. Kenanga',
          phone: '08122715789',
          email: 'prawiranegara@gmail.com',
          UserId: 4,
          createdAt:new Date,
          updatedAt:new Date
        }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
