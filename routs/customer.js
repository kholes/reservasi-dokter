const express = require('express')
const router = express.Router()
const model = require('../models')
const tools = require('../helper/tools')
router.get('/', (req,res) => {
	model.Customer.findAll().then(customers => {
		let prom = customers.map(customer => {
			return new Promise((resolve,reject) => {
				customer.getUser().then(user => {
					if(user){
						customer['username'] = user.username
					}
					else {
						customer['username'] = "<p style='color:red'>empty</p>"
					}
					resolve(customer)
				})
			})
		})
		Promise.all(prom).then(customers => {
			res.render('./customer/customer_list', {data:customers})
		}).catch(err => {
			res.send(err)
		})
	}).catch(err => {
		res.send(err)
	})
})
router.get('/add', (req,res) => {
	model.User.findAll().then(users => {
		res.render('./customer/customer_add', {msg:'',users:users})
	})
	.then(err => {
		res.send(err)
	})
})
router.post('/add', (req,res) => {
	model.Customer.create(req.body)
	.then(add => {
		res.redirect('/customers')
	})
	.catch(err => {
		res.send(err)
	})
})
router.get('/edit/:id', (req,res) => {
	model.Customer.findById(req.params.id)
	.then(customer => {
		customer.getUser().then(user => {
			customer['username'] = user.username
			model.User.findAll().then(users => {
				res.render('./customer/customer_edit', {data:customer,users:users})
			})
		})
	})
	.catch(err => {
		res.send(err)
	})
})
router.post('/edit/:id', (req,res) => {
	model.Customer.update(req.body,{where:{id:req.params.id}, validate:false})
	.then(update => {
		res.redirect('/customers')
	})
	.catch(err => {
		res.send(err)
	})
})
router.get('/delete/:id', (req,res) => {
	model.Customer.destroy({where:{id:req.params.id}})
	.then(del => {
		res.redirect('/customers')
	})
	.catch(err => {
		res.send(err)
	})
})
module.exports = router
