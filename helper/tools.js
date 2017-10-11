const cryptorjs = require('cryptorjs');
class Tools{
	static isLogin(req,res,next){
	  	if(req.session.isLogin){
	    	next()
	  	}else{
	    	res.render('index', {msg:'',title:'User Login!'});
	  	}
	}
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