const express = require('express')
const router = express.Router()
const models = require('../models')

router.get('/', (req,res) => {
  models.Schedule.findAll({
    include:[{
      model:models.Doctor}]
  })
  .then(rowsSchedule=>{
    // res.send(rowsSchedule)
    res.render('./schedule/schedule_list',{dataSchedule:rowsSchedule});
  })
  .catch(err=>{
    res.send(err);
  })
})
router.get('/add', (req,res) => {
  models.Doctor.findAll({
    order:[['name','asc']]
  })
  .then(rowsDoctor=>{
    // res.send(rowsSchedule)
    let hari=[
      {"hari":"Senin"},
      {"hari":"Selasa"},
      {"hari":"Rabu"},
      {"hari":"Kamis"},
      {"hari":"Jumat"},
      {"hari":"Sabtu"},
      {"hari":"Minggu"}
    ]
    // console.log(hari);
    // res.send(hari)
    res.render('./schedule/schedule_add',{dataDoctor:rowsDoctor,hari:hari});
  })
  .catch(err=>{
    res.send(err);
  })
})
router.post('/add', (req,res) => {
  // res.send(req.body);
  // console.log(req.body.date);
  // let date_conv = req.body.date
	// let date = date_conv.getFullYear() + '-' + +(date_conv.getMonth()+1) + '-' + date_conv.getDate()
  models.Schedule.create({
    day:`${req.body.day}`,
    time:`${req.body.time}`,
    max_customer:`${req.body.max_customer}`,
    DoctorId:`${req.body.DoctorId}`
  })
  .then(()=>{
    // res.send(rowsSchedule)
    res.redirect('/schedules')
  })
  .catch(err=>{
    res.send(err);
  })
})
router.get('/edit/:id', (req,res) => {
  models.Schedule.findById(req.params.id)
  .then(rowSchedule=>{
    models.Doctor.findAll({
      order:[['name','asc']]
    })
    .then(rowsDoctor=>{
      // res.send(rowSchedule)
      let hari=[
        {"hari":"Senin"},
        {"hari":"Selasa"},
        {"hari":"Rabu"},
        {"hari":"Kamis"},
        {"hari":"Jumat"},
        {"hari":"Sabtu"},
        {"hari":"Minggu"}
      ]
      res.render('./schedule/schedule_edit',{dataDoctor:rowsDoctor,hari:hari,dataSchedule:rowSchedule});
    })
  })
  .catch(err=>{
    res.send(err);
  })
})
router.post('/edit/:id', (req,res) => {
  models.Schedule.update({
  day:`${req.body.day}`,
  time:`${req.body.time}`,
  max_customer:`${req.body.max_customer}`,
  DoctorId:`${req.body.DoctorId}`
  },{
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
    // res.send(rowsSchedule)
    res.redirect('/schedules')
  })
  .catch(err=>{
    res.send(err);
  })
})
router.get('/delete/:id', (req,res) => {
  models.Schedule.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(rowsDoctor=>{
    // res.send(rowsSchedule)
    res.redirect('/schedules')
  })
  .catch(err=>{
    res.send(err);
  })
})
module.exports = router
