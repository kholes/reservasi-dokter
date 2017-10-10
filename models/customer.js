'use strict';
module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Customer;
};