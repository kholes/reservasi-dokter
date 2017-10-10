'use strict';
module.exports = function(sequelize, DataTypes) {
  var Schedule = sequelize.define('Schedule', {
    day: DataTypes.STRING,
    time: DataTypes.STRING,
    DoctorId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Schedule;
};