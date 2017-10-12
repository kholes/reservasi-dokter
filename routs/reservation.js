const express = require('express')
const router = express.Router()
const models = require('../models')
const tools = require('../helper/tools')
// router.post('/add/:id', (req,res) => {
//   models.Schedule.findAll({where:{id:req.params.id},include:[{model:models.Doctor}]})
//   .then(rowsSchedule=>{
//     models.Customer.findAll()
//     .then(rowsCustomer=>{
//       res.render('./reservation/reservation_add',{data:req.body,dataSchedule:rowsSchedule,dataCustomer:rowsCustomer,message:''});
//     })
//   })
// })
router.get('/add/:id', (req,res) => {
  if(!req.session.isLogin) {
    res.redirect('/login/reservation/'+req.params.id)
  }
  models.Schedule.findAll({where:{id:req.params.id},include:[{model:models.Doctor}]})
  .then(rowsSchedule=>{
    models.Customer.findAll()
    .then(rowsCustomer=>{
      res.render('./reservation/reservation_add',{sessionId:req.session.user.idUser,dataSchedule:rowsSchedule,dataCustomer:rowsCustomer,message:''});
    })
  })
  .catch(err=>{
    res.send(err);
  })
})
// parse a date in yyyy-mm-dd format
function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  // console.log(parts);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}
// parse a date in yyyy-mm-dd format
function hariKe(hari) {
  if (hari=='Minggu') {
    return 0;
  } else
  if (hari=='Senin') {
    return 1;
  } else
  if (hari=='Selasa') {
    return 2;
  } else
  if (hari=='Rabu') {
    return 3;
  } else
  if (hari=='Kamis') {
    return 4;
  } else
  if (hari=='Jumat') {
    return 5;
  } else
  if (hari=='6') {
    return 6;
  }
}
router.post('/add/:id', (req,res) => {
  let date_select = hariKe(req.body.day);
  let date_order = parseDate(req.body.date);
  let date_now = new Date();
  let message='';
  // console.log((date_now,date_order));

  if (date_order<date_now) {
    // console.log('tanggal lebih kecil');
    message='Tanggal order anda minimal sama dengan tanggal hari ini!';
  } else
  if (date_order.getDay()!=date_select){
    message='Tanggal yang anda pilih tidak sama dengan jadwal yang ada!';
  }

  if (date_order.getDay()==date_select && date_order>date_now) {
    models.Reservation.create({
      date:`${req.body.date}`,
      ScheduleId:`${req.params.id}`,
      CustomerId:`${req.body.CustomerId}`,
      status:`order`
    })
    .then((result)=>{
      models.Reservation.findAll({
        where:{id:result.id},
        include:[
          {model:models.Customer},
          {model:models.Schedule}
        ]
      })
      .then(rows=>{
        let promiseReservation=rows.map(rows=>{
          return new Promise(function(resolve,reject){
            models.Doctor.findById(rows.Schedule.DoctorId)
            .then(x=>{
              rows.Schedule['doctor_name']=x.name;
              rows.Schedule['doctor_specialist']=x.specialist;
              resolve(rows)
            })
            .catch(err=>{
              reject(err)
            })
          })
        })
        Promise.all(promiseReservation)
        .then(rowsReservation=>{
          res.render('./reservation/reservation_detil',{detilReservation:rowsReservation})
        })
      })
    })
    .catch(err=>{
      res.send(err);
    })
  } else {
    models.Schedule.findAll({
      where:{
        id:req.params.id
      },
      include:[{
        model:models.Doctor}]
    })
    .then(rowsSchedule=>{
      models.Customer.findAll()
      .then(rowsCustomer=>{
        // res.send(rowsSchedule)
        res.render('./reservation/reservation_add',{dataSchedule:rowsSchedule,dataCustomer:rowsCustomer,message:message});
      })
    })
    .catch(err=>{
      res.send(err);
    })
  }
})
router.get('/cancellation/:CustomerId', (req,res) => {
  // console.log(req.params);
  models.Reservation.findAll({
    where:{
      CustomerId:req.params.CustomerId,
      status:'order'
    },
    include:[
      {model:models.Customer},
      {model:models.Schedule}
    ]
  })
  .then(rows=>{
    let promiseReservation=rows.map(rows=>{
      return new Promise(function(resolve,reject){
        models.Doctor.findById(rows.Schedule.DoctorId)
        .then(x=>{
          rows.Schedule['doctor_name']=x.name;
          rows.Schedule['doctor_specialist']=x.specialist;
          resolve(rows)
        })
        .catch(err=>{
          reject(err)
        })
      })
    })
    Promise.all(promiseReservation)
    .then(rowsReservation=>{
      // res.send(rowsReservation)
      // console.log(rowsReservation.length);
      if (rowsReservation.length>0) {
        res.render('./reservation/reservation_cancellation',{dataReservation:rowsReservation})
      } else {
          res.redirect('/');
      }
    })
  })
  .catch(err=>{
    res.send(err);
  })
})
router.post('/cancellation/:CustomerId', (req,res) => {
  // res.send(req.body);
  // console.log(Object.keys(req.body).length);
  let length=Object.keys(req.body).length;
  let count=0;
  for (var i in req.body) {
    count++
    models.Reservation.update({
      status:'batal'
      },{
        where:{
          id:`${i}`
        }
      }
    )
    .then(()=>{
      if (length==count) {
        res.redirect('/');
      }
    })
  }

  // models.Reservation.update({
  //   status:'batal'
  //   },{
  //     where:{
  //       id:req.params.id
  //     }
  //   }
  // )
  // .then(()=>{
  //
  // })

})
module.exports = router
