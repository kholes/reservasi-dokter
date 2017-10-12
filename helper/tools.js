const cryptorjs = require('cryptorjs');
const models = require('../models')
class Tools{
	// static isLogin(req,res,next){
	//   	if(req.session.isLogin){
	//     	next()
	//   	}else{
	// 		res.render('login', {msg:''})	  		
	// 		// models.Schedule.findAll({include:[{model:models.Doctor}]})
	// 		// .then(rowsSchedule=>{
	// 		// 	// res.render('dashboard',{dataSchedule:rowsSchedule})
	// 		// 	res.render('index', {dataSchedule:rowsSchedule,msg:'',title:'User Login!'});
	// 		// })
	//   	}
	// }
	static salt(){
		let txt = ''
		let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
		for(let i = 0; i <= 5;i++) {
			txt += str.charAt(Math.floor(Math.random()*str.length))
		}
		return txt
	}
	static cryptor(salt,pass){
		let newPass = salt+pass
	    let Encrypt = new cryptorjs(salt);
	    let encoded = Encrypt.encode(newPass);
	    return encoded;
 	}
}
module.exports = Tools
