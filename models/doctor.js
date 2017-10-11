'use strict';
const model = require('../models')
module.exports = function(sequelize, DataTypes) {
  var Doctor = sequelize.define('Doctor', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {msg:'Email not valid!'}
      },
      isUnique: function(value,next){
        Doctor.findOne({where:{email:value}})
        .then(user => {
          if(user){
            next('Email already exist!')
          }
          else {
            next()
          }
        })
      }
    },
    UserId: DataTypes.INTEGER,
    specialist: DataTypes.STRING
  });
  Doctor.associate = (model) => {
    Doctor.belongsTo(model.User)
  }
  return Doctor;
};