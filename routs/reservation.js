const express = require('express')
const router = express.Router()
const model = require('../models')
const tools = require('../helper/tools')
router.get('/', (req,res) => {
	res.send("MASUK"+req.body)
})
module.exports = router