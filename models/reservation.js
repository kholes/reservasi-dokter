'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define('Reservation', {
    DoctorId: DataTypes.INTEGER,
    ScheduleId: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Reservation;
};