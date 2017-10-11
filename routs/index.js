const express = require('express')
const router = express.Router()
const models = require('../models')
const Sequelize = require('sequelize');

router.get('/', (req,res) => {
	models.Schedule.findAll({
		// where:{
			// date:new Date()
			// date:`${date}`
			// date:`${date}`
			// date:'2017:10:10'
		// },
		include:[{
			model:models.Doctor
		}]
	})
	.then(rowsSchedule=>{
		// models.
		// console.log(rowsSchedule);
		// res.send(rowsSchedule)
		res.render('index',{dataSchedule:rowsSchedule})
	})
})
module.exports = router
