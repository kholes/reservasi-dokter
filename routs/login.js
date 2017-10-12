const express = require('express')
const session = require('express-session')
const router = express.Router()
const models = require('../models')
const tools = require('../helper/tools')
router.get('/', (req,res) => {
	res.render('login',{msg:''})
})
router.post('/', (req,res) => {
	models.User.findOne({where:{username:req.body.username}})
	.then(user => {
		if(user) {
			let oldPass = user.password
			let newPass = tools.cryptor(user.salt,req.body.password)
			if(newPass === oldPass) {
		        req.session.isLogin = true;
		        req.session.user={username:user.username,role:user.role,logTime:new Date()}
				if(user.role == 'Customer'){
					if (req.params.id) {
						res.redirect('/reservations/add/'+req.params.id)
					}
					else {
						models.Schedule.findAll({include:[{model:models.Doctor}]})
							.then(rowsSchedule => {
							res.render('index',{dataSchedule:rowsSchedule})
						})
					}
				}else{
					res.render('dashboard')
				}
			} else {
				res.render('login', {msg:'<p class="msg" style="color:red">Username or password not match!</p>',title:'Add Student',role:req.session.user})
			}
		} else {
			res.render('login', {msg:'<p class="msg" style="color:red">Username or password not match!</p>',title:'Add Student',role:req.session.user})
		}
	})
	.catch(err => {
		res.send(err)
	})
})

router.get('/reservation/:id', (req,res) => {
	res.render('login_reservation', {msg:'',id:req.params.id})
})
router.post('/reservation/:id', (req,res) => {
	models.User.findOne({where:{username:req.body.username}})
	.then(user => {
		if(user) {
			if(user.role){
				let oldPass = user.password
				let newPass = tools.cryptor(user.salt,req.body.password)
				if(newPass === oldPass) {
			        req.session.isLogin = true;
			        req.session.user={username:user.username,role:user.role,idUser:user.id,logTime:new Date()}
					res.redirect('/reservations/add/'+req.params.id)
				} else {
					res.render('/reservations/add/', {msg:'<p class="msg" style="color:red">Username or password not match!</p>',title:'Add Student',role:req.session.user})
				}
			} else {
				res.render('/reservations/add/', {msg:'<p class="msg" style="color:red">Username or password not match!</p>',title:'Add Student',role:req.session.user})
			}
		} else {
			res.render('/reservations/add/', {msg:'<p class="msg" style="color:red">Username or password not match!</p>',title:'Add Student',role:req.session.user})
		}
	})
	.catch(err => {
		res.send(err)
	})
})
router.get('/logout', (req,res) => {
	req.session.destroy()
	res.redirect('/')
})
module.exports = router