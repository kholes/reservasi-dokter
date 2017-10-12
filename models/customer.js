'use strict';
module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail: {
          msg:'Email not valid!'
        },
        isUnique: function(value,next) {
          Customer.findOne({where:{email:value}}).then(customer => {
            if(customer) {
              next('Email already exist!')
            } else {
              next()
            }
          })
        }
      }
    },
    UserId: DataTypes.INTEGER
  });

  Customer.associate=function (models){
    Customer.belongsToMany(models.Schedule, {through:'Reservation'});
    Customer.belongsTo(models.User)
  }
  return Customer;
};
