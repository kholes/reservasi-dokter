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
    return queryInterface.bulkInsert('Doctors', [{
          name: 'Bambang Suprapto',
          address: 'Jl. Sudirman',
          phone: '08122789819',
          email: 'bambangsuprapto@gmail.com',
          UserId: 1,
          specialist: 'Umum',
          createdAt:new Date,
          updatedAt:new Date
      },{
          name: 'Rukmana Fatmawati',
          address: 'Jl. A. Yani',
          phone: '08122767354',
          email: 'rukmanafatmawati@gmail.com',
          UserId: 2,
          specialist: 'Penyakit Dalam',
          createdAt:new Date,
          updatedAt:new Date
      },{
          name: 'Butet Naiborhu',
          address: 'Jl. Kedongan',
          phone: '08122738223',
          email: 'butetnaiborhu@gmail.com',
          UserId: 3,
          specialist: 'Kandungan',
          createdAt:new Date,
          updatedAt:new Date
      },{
          name: 'Yulius Prawiranegara',
          address: 'Jl. Kenanga',
          phone: '08122715789',
          email: 'yuliusprawiranegara@gmail.com',
          UserId: 4,
          specialist: 'Anak',
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
