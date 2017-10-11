const express = require('express')
const router = express.Router()
const model = require('../models')
const tools = require('../helper/tools')
router.get('/', (req,res) => {
	model.User.findAll()
	.then(users => {
		res.render('user/user_list', {data:users})
	})
	.catch(err => {
		res.send(err)
	})
})
router.get('/add', (req,res) => {
	res.render('user/user_add', {msg:''})
})
router.post('/add', (req,res) => {
	let user = {}
	user['username'] = req.body.username
	user['password'] = req.body.password
	user['salt'] = tools.salt()
	user['role'] = req.body.role
	model.User.create(user)
	.then(add => {
		res.redirect('/users')
	})
	.catch(err => {
		res.send(err)
	})
})
router.get('/edit/:id', (req,res) => {
	model.User.findById(req.params.id)
	.then(user => {
		res.render('user/user_edit', {data:user})
	})
	.catch(err => {
		res.send(err)
	})
})
router.post('/edit/:id', (req,res) => {
	model.User.update({role:req.body.role},{where:{id:req.params.id}})
	.then(update => {
		res.redirect('/users')
	})
	.catch(err => {

	})
})
router.get('/delete/:id', (req,res) => {
	model.User.destroy({where:{id:req.params.id}})
	.then(del => {
		res.redirect('/users')
	})
	.catch(err => {
		res.send(err)
	})
})
module.exports = router