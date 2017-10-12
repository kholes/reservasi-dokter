'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define('Reservation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
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
  Reservation.associate=function (models){
    Reservation.belongsTo(models.Schedule);
    Reservation.belongsTo(models.Customer);
  }
  return Reservation;
};
