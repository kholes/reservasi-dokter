const express = require('express')
const session = require('express-session')
const router = express.Router()
const model = require('../models')
const tools = require('../helper/tools')
router.get('/',tools.isLogin,(req,res) => {
	res.render('dashboard')
})
router.get('/login', (req,res) => {
	model.User.findOne({where:{username:req.body.username}})
	.then(user => {
		if(user) {
			let oldPass = user.password
			let newPass = tools.cryptor(user.salt,req.body.password)
			if(newPass === oldPass) {
		        req.session.isLogin = true;
		        req.session.user={username:user.username,role:user.role,logTime:new Date()}
				res.redirect('/')
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
router.get('/logout', (req,res) => {
	req.session.destroy()
})
module.exports = router