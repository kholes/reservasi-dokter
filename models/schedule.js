'use strict';
module.exports = function(sequelize, DataTypes) {
  var Schedule = sequelize.define('Schedule', {
    day: DataTypes.STRING,
    time: DataTypes.STRING,
    max_customer: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Schedule.associate=function (models){
    Schedule.belongsTo(models.Doctor);
    Schedule.belongsToMany(models.Customer, {through:'Reservation'});
  }
  return Schedule;
};
