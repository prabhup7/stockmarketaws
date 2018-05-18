
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');
var index= require('./routes/index')
  , login = require('./routes/login')
  , mongoose = require('mongoose')
  , session = require('express-session');

var app = express();

mongoose.connect('mongodb://localhost/stock-market');
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(session({cookieName: 'session', secret: "fafadsfasfgfsgsa", resave: false, saveUninitialized: true,
    duration: 30 * 60 * 1000, activeDuration: 5 * 60 * 1000}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/login',login.login);
app.post('/userhome',login.userhome);
app.get('/userhome',login.userhomeGet);
app.get('/signup',login.signup);
app.post('/registerUser',login.registerUser);
app.get('/registerUser',login.registerUserGet);
app.get('/sectoranalysis',login.sectoranalysis);
app.get('/yearanalysis',login.yearanalysis);
app.get('/companyanalysis',login.companyanalysis);
app.get('/profile',login.userprofile);
app.get('/logout',login.logout);
app.get('/company',login.company);
app.post('/technicalanalysis',login.technicalanalysis);
app.get('/prediction',login.prediction);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
