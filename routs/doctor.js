const express = require('express')
const router = express.Router()
const model = require('../models')
const tools = require('../helper/tools')
router.get('/', (req,res) => {
	model.Doctor.findAll().then(doctors => {
		let prom = doctors.map(doctor => {
			return new Promise((resolve,reject) => {
				doctor.getUser().then(user => {
					doctor['username'] = user.username
					resolve(doctor)
				})
			})
		})
		Promise.all(prom).then(doctors => {
			res.render('doctor/doctor_list', {data:doctors})
		}).catch(err => {
			res.send(err)
		})
	}).catch(err => {
		res.send(err)
	})
})
router.get('/add', (req,res) => {
	model.User.findAll().then(users => {
		res.render('doctor/doctor_add', {msg:'',users:users})
	})
	.then(err => {
		res.send(err)
	})
})
router.post('/add', (req,res) => {
	model.Doctor.create(req.body)
	.then(add => {
		res.redirect('/doctors')
	})
	.catch(err => {
		res.send(err)
	})
})
router.get('/edit/:id', (req,res) => {
	model.Doctor.findById(req.params.id)
	.then(doctor => {
		doctor.getUser().then(user => {
			doctor['username'] = user.username
			model.User.findAll().then(users => {
				res.render('doctor/doctor_edit', {data:doctor,users:users})
			})
		})
	})
	.catch(err => {
		res.send(err)
	})
})
router.post('/edit/:id', (req,res) => {
	model.Doctor.update(req.body,{where:{id:req.params.id}})
	.then(update => {
		res.redirect('/doctors')
	})
	.catch(err => {

	})
})
router.get('/delete/:id', (req,res) => {
	model.Doctor.destroy({where:{id:req.params.id}})
	.then(del => {
		res.redirect('/doctors')
	})
	.catch(err => {
		res.send(err)
	})
})
module.exports = router