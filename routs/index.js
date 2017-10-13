const express = require('express')
const session = require('express-session')
const router = express.Router()
const models = require('../models')
const tools = require('../helper/tools')
var Sequelize = require('sequelize');
var sequelize = new Sequelize('reservation', 'postgres', 'postgres', {host: '127.0.0.1', dialect: 'postgres'});

router.get('/', (req,res) => {
	 if(req.session.isLogin){
	 	if (req.session.user.role == 'Customer') {
			models.Schedule.findAll({include:[{model:models.Doctor}]})
			.then(rowsSchedule=>{
				sequelize.query(`select count(*) as count,"a"."ScheduleId","c"."name","c"."specialist" from "Reservations" "a", "Schedules" 			"b","Doctors" "c" where "a"."ScheduleId"="b"."id" and "b"."DoctorId"="c"."id" group by "a"."ScheduleId","c"."name","c"."specialist" order by count desc `,
				{ type: sequelize.QueryTypes.SELECT})
				.then((rowsStatistik)=>{
					// res.send(rowsStatistik);
					res.render('index',{dataSchedule:rowsSchedule,dataStatistik:rowsStatistik})
				})
				.catch(err=>{
					res.send(err);
				})
			})
	 	} else {
	 		res.render('dashboard')
	 	}
	 }else{
		models.Schedule.findAll({include:[{model:models.Doctor}]})
		.then(rowsSchedule=>{
			sequelize.query(`select count(*) as count,"a"."ScheduleId","c"."name","c"."specialist" from "Reservations" "a", "Schedules" 			"b","Doctors" "c" where "a"."ScheduleId"="b"."id" and "b"."DoctorId"="c"."id" group by "a"."ScheduleId","c"."name","c"."specialist" order by count desc `,
			{ type: sequelize.QueryTypes.SELECT})
			.then((rowsStatistik)=>{
				// res.send(rowsStatistik);
				res.render('index',{dataSchedule:rowsSchedule,dataStatistik:rowsStatistik})
			})
			.catch(err=>{
				res.send(err);
			})
		})
	}
})
module.exports = router


// const express = require('express')
// const session = require('express-session')
// const router = express.Router()
// const models = require('../models')
// const tools = require('../helper/tools')
// router.get('/', (req,res) => {
// 	 if(req.session.isLogin){
// 	 	if (req.session.user.role == 'Customer') {
// 	 		models.Schedule.findAll({include:[{model:models.Doctor}]})
// 			.then(rowsSchedule=>{
// 				res.render('index',{dataSchedule:rowsSchedule})
// 			})
// 	 	} else {
// 	 		res.render('dashboard')
// 	 	}
// 	 }else{
// 		models.Schedule.findAll({include:[{model:models.Doctor}]})
// 		.then(rowsSchedule=>{
// 			res.render('index',{dataSchedule:rowsSchedule})
// 		})
// 	}
// })
// module.exports = router
