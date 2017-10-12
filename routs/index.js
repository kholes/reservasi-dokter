const express = require('express')
const session = require('express-session')
const router = express.Router()
const models = require('../models')
const tools = require('../helper/tools')
router.get('/', (req,res) => {
	 if(req.session.isLogin){
	 	if (req.session.user.role == 'Customer') {
	 		models.Schedule.findAll({include:[{model:models.Doctor}]})
			.then(rowsSchedule=>{
				res.render('index',{dataSchedule:rowsSchedule})
			})
	 	} else {
	 		res.render('dashboard')
	 	}
	 }else{
		models.Schedule.findAll({include:[{model:models.Doctor}]})
		.then(rowsSchedule=>{
			res.render('index',{dataSchedule:rowsSchedule})
		})
	}
})
module.exports = router
