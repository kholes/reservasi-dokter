const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')
const tools = require('./helper/tools')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
let path = require('path')
// let login = require('./routs/login')
// let signup = require('./routs/signup')
const index = require('./routs/index')
const schedule = require('./routs/schedule')
const reservation = require('./routs/reservation')
app.use(session({
  secret:'secret',
  cookies:{}
}))
app.use('/static',express.static(__dirname + '/asset'));
app.use('/', index);
app.use('/schedules', schedule);
app.use('/reservations', reservation);
// app.use('/signup', signup);
// app.use('/login', login);
// app.use('/', tools.isLogin, index)
app.listen(process.env.PORT||3000,()=>{
  console.log('Listening Port 3000')
});
