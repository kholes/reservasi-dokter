'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING, 
      validate:{
        isUnique: function(value,next){
          User.findOne({where:{username:value}})
          .then(user => {
            if(user){
              next('Username alredy exist!')
            }
            else {
              next()
            }
          })
        }
      }
    },
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.STRING
  },
  {
    hooks: {
      beforeCreate: (data) => {
        const tools = require('../helper/tools')
        let newPass = tools.cryptor(data.salt,data.password)
        data.password = newPass
      } 
    }
  });
  User.associate = (model) => {
    User.hasOne(model.Doctor)
    User.hasOne(model.Customer)
  }
  return User;
};